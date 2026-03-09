import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/backend/routes/copilot-routes.ts';

const newContent = `import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/async-handler.js';
import { ValidationError } from '../errors.js';
import { DEFAULT_TENANT_ID } from '../db.js';
import { chat } from '../services/copilot-service.js';
import { createEvent } from '../repositories/event-repository.js';

// ─── Copilot Rate Limiter ────────────────────────────────────────────────────
// Demo users: 20 messages/hour (cost protection)
// Regular users: 60 messages/hour
// Keyed by userId (or IP fallback for anonymous)

interface RateLimitEntry { count: number; resetAt: number; }
const copilotStore = new Map<string, RateLimitEntry>();

function copilotRateLimit(req: Request, res: Response, next: () => void): void {
  const isDemo = !!(req.user as Record<string, unknown> | undefined)?.isDemo;
  const key = req.user?.userId || req.ip || 'anon';
  const maxRequests = isDemo ? 20 : 60;
  const windowMs = 60 * 60 * 1000; // 1 hour
  const now = Date.now();

  const entry = copilotStore.get(key);
  if (!entry || now > entry.resetAt) {
    copilotStore.set(key, { count: 1, resetAt: now + windowMs });
    res.setHeader('X-Copilot-RateLimit-Limit', maxRequests);
    res.setHeader('X-Copilot-RateLimit-Remaining', maxRequests - 1);
    next();
    return;
  }

  entry.count++;
  const remaining = Math.max(0, maxRequests - entry.count);
  res.setHeader('X-Copilot-RateLimit-Limit', maxRequests);
  res.setHeader('X-Copilot-RateLimit-Remaining', remaining);
  res.setHeader('X-Copilot-RateLimit-Reset', Math.ceil(entry.resetAt / 1000));

  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    res.status(429).json({
      error: 'COPILOT_RATE_LIMITED',
      message: isDemo
        ? \`Demo copilot limit reached (${maxRequests} messages/hour). Get full access for higher limits.\`
        : \`Copilot rate limit reached (${maxRequests} messages/hour). Please try again later.\`,
      retryAfter,
    });
    return;
  }

  next();
}

// Clean up expired entries every 30 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of copilotStore.entries()) {
    if (now > entry.resetAt) copilotStore.delete(key);
  }
}, 30 * 60 * 1000);

// ─── Routes ─────────────────────────────────────────────────────────────────

export function createCopilotRoutes(): Router {
  const router = Router();

  router.post('/chat', copilotRateLimit as unknown as (req: Request, res: Response, next: () => void) => void, asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const message = typeof req.body.message === 'string' ? req.body.message : '';
    const context = typeof req.body.context === 'object' && req.body.context !== null
      ? req.body.context as { currentPage?: string; selectedEntityId?: string; selectedEntityType?: string; locale?: string }
      : undefined;

    if (!message.trim()) {
      throw new ValidationError('message is required');
    }

    const tenantId = req.user?.tenantId || DEFAULT_TENANT_ID;
    const response = await chat({ message, context }, tenantId, req.user?.userId);

    res.status(200).json(response);
  }));

  router.post('/feedback', asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { messageId, rating } = req.body as { messageId?: string; rating?: string };

    if (!messageId || typeof messageId !== 'string') {
      throw new ValidationError('messageId is required');
    }
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!UUID_REGEX.test(messageId)) {
      throw new ValidationError('Invalid messageId format');
    }
    if (rating !== 'up' && rating !== 'down') {
      throw new ValidationError('rating must be "up" or "down"');
    }

    const tenantId = req.user?.tenantId || DEFAULT_TENANT_ID;

    await createEvent({
      event_type: 'copilot.feedback',
      entity_type: 'system',
      entity_id: messageId,
      payload: {
        rating,
        userId: req.user?.userId,
        tenant_id: tenantId,
      },
    });

    res.status(200).json({ ok: true });
  }));

  return router;
}

export default createCopilotRoutes;
`;

writeFileSync(path, newContent, 'utf8');
console.log('Done: copilot rate limiting added (demo: 20/hr, users: 60/hr)');
