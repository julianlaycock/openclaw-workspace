const fs = require('fs');

// 1. Add rotateApiKey function to api-key-service.ts
const svcPath = 'C:\\Users\\julia\\projects\\private-asset-registry_Caelith_v2\\src\\backend\\services\\api-key-service.ts';
let svc = fs.readFileSync(svcPath, 'utf8');

const rotateFunc = `
/**
 * Rotate an API key: revoke the old one, generate a new one with same name/scopes.
 */
export async function rotateApiKey(
  keyId: string,
  userId: string,
  tenantId: string
): Promise<ApiKeyCreateResult | null> {
  // Fetch the existing key metadata before revoking
  const rows = await query<ApiKeyRow>(
    \`SELECT id, name, scopes, expires_at FROM api_keys
     WHERE id = $1 AND tenant_id = $2 AND (revoked = false OR revoked IS NULL)\`,
    [keyId, tenantId]
  );

  if (rows.length === 0) return null;

  const old = rows[0];
  const scopes = parseScopes(old.scopes);

  // Revoke old key
  await revokeApiKey(keyId, tenantId);

  // Generate new key with same name/scopes, default 90-day expiry
  const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
  const newKey = await generateApiKey(userId, tenantId, old.name + ' (rotated)', scopes, expiresAt);

  logger.info('API key rotated', { oldKeyId: keyId, newKeyId: newKey.id, tenantId });
  auditLog({ event: 'api_key.rotated', userId, tenantId, metadata: { oldKeyId: keyId, newKeyId: newKey.id } });

  return newKey;
}
`;

// Add before the last closing of file (after listApiKeys)
if (!svc.includes('rotateApiKey')) {
  svc = svc.trimEnd() + '\n' + rotateFunc;
  fs.writeFileSync(svcPath, svc);
  console.log('api-key-service.ts: rotateApiKey added');
} else {
  console.log('api-key-service.ts: rotateApiKey already exists');
}

// 2. Add rotate route to api-key-routes.ts
const routePath = 'C:\\Users\\julia\\projects\\private-asset-registry_Caelith_v2\\src\\backend\\routes\\api-key-routes.ts';
let routes = fs.readFileSync(routePath, 'utf8');

if (!routes.includes('rotateApiKey')) {
  // Update import
  routes = routes.replace(
    "import { generateApiKey, listApiKeys, revokeApiKey } from '../services/api-key-service.js';",
    "import { generateApiKey, listApiKeys, revokeApiKey, rotateApiKey } from '../services/api-key-service.js';"
  );

  // Add rotate endpoint before the delete route
  const rotateRoute = `
// Rotate API key (revoke old, generate new with same config + 90-day expiry)
router.post('/:id/rotate', asyncHandler(async (req, res) => {
  const result = await rotateApiKey(req.params.id, req.user!.userId, req.user!.tenantId);
  if (!result) {
    res.status(404).json({ error: 'NOT_FOUND', message: 'API key not found or already revoked' });
    return;
  }
  res.status(201).json({
    ...result,
    warning: 'Store this key securely. It will not be shown again. The old key has been revoked.',
  });
}));

`;

  routes = routes.replace(
    "// Revoke API key\nrouter.delete",
    rotateRoute + "// Revoke API key\nrouter.delete"
  );
  
  // Handle CRLF
  if (!routes.includes(rotateRoute)) {
    routes = routes.replace(
      "// Revoke API key\r\nrouter.delete",
      rotateRoute + "// Revoke API key\r\nrouter.delete"
    );
  }

  fs.writeFileSync(routePath, routes);
  console.log('api-key-routes.ts: rotate endpoint added');
} else {
  console.log('api-key-routes.ts: rotate already exists');
}

// 3. Add /api/security-info endpoint to server.ts
const serverPath = 'C:\\Users\\julia\\projects\\private-asset-registry_Caelith_v2\\src\\backend\\server.ts';
let server = fs.readFileSync(serverPath, 'utf8');

if (!server.includes('security-info')) {
  const securityInfoRoute = `
// ─── Security Info Endpoint (admin only) ──────────────────────
app.get('/api/security-info', authenticate, authorize('admin'), (_req: express.Request, res: express.Response) => {
  res.json({
    csp: {
      active: true,
      unsafeInline: true, // Required by Next.js — see CSP rationale in security.ts
      unsafeEval: process.env.NODE_ENV !== 'production',
      note: "unsafe-inline required by Next.js hydration. TODO: nonce-based CSP.",
    },
    cors: {
      origins: ALLOWED_ORIGINS,
      localhostBlocked: process.env.NODE_ENV === 'production',
    },
    rateLimiting: {
      active: true,
      apiLimit: process.env.NODE_ENV === 'production' ? 500 : 2000,
      windowMinutes: 15,
    },
    mfa: {
      enabled: false,
      note: 'MFA support planned for future release',
    },
    lastSecurityAudit: '2026-02-28',
  });
});

`;

  // Insert before the health check endpoint
  const healthMarker = '// Health check endpoints';
  if (server.includes(healthMarker)) {
    server = server.replace(healthMarker, securityInfoRoute + healthMarker);
    fs.writeFileSync(serverPath, server);
    console.log('server.ts: /api/security-info endpoint added');
  } else {
    console.log('server.ts: could not find health check marker');
  }
} else {
  console.log('server.ts: security-info already exists');
}

console.log('All endpoint additions complete');
