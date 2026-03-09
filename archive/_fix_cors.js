const fs = require('fs');
const p = 'C:\\Users\\julia\\projects\\private-asset-registry_Caelith_v2\\src\\backend\\server.ts';
let c = fs.readFileSync(p, 'utf8');

// Fix CORS: ensure production never includes localhost even if CORS_ORIGINS env var has them
const oldCors = `const ALLOWED_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(s => s.trim())
  : (process.env.NODE_ENV === 'production' ? DEFAULT_PROD_ORIGINS : DEFAULT_DEV_ORIGINS);`;

const newCors = `const ALLOWED_ORIGINS = (() => {
  const envOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map(s => s.trim())
    : null;

  if (process.env.NODE_ENV === 'production') {
    // In production, filter out any localhost origins even if accidentally set in CORS_ORIGINS
    const origins = envOrigins || DEFAULT_PROD_ORIGINS;
    const filtered = origins.filter(o => !o.includes('localhost') && !o.includes('127.0.0.1'));
    if (filtered.length === 0) {
      logger.warn('CORS: All origins were localhost — falling back to production defaults');
      return DEFAULT_PROD_ORIGINS;
    }
    if (filtered.length < origins.length) {
      logger.warn('CORS: Stripped localhost origins from production config');
    }
    return filtered;
  }

  return envOrigins || DEFAULT_DEV_ORIGINS;
})();`;

if (c.includes(oldCors)) {
  c = c.replace(oldCors, newCors);
  console.log('CORS config updated');
} else {
  console.log('CORS pattern not found - check manually');
}

fs.writeFileSync(p, c);
