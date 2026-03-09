const fs = require('fs');
const p = 'C:\\Users\\julia\\projects\\private-asset-registry_Caelith_v2\\src\\backend\\server.ts';
let c = fs.readFileSync(p, 'utf8');

// Use regex to handle CRLF
c = c.replace(
  /const ALLOWED_ORIGINS = process\.env\.CORS_ORIGINS\r?\n\s+\? process\.env\.CORS_ORIGINS\.split\(','\)\.map\(s => s\.trim\(\)\)\r?\n\s+: \(process\.env\.NODE_ENV === 'production' \? DEFAULT_PROD_ORIGINS : DEFAULT_DEV_ORIGINS\);/,
  `const ALLOWED_ORIGINS = (() => {
  const envOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map(s => s.trim())
    : null;

  if (process.env.NODE_ENV === 'production') {
    // Security: NEVER allow localhost origins in production, even if accidentally configured
    const origins = envOrigins || DEFAULT_PROD_ORIGINS;
    const filtered = origins.filter(o => !o.includes('localhost') && !o.includes('127.0.0.1'));
    if (filtered.length === 0) {
      logger.warn('CORS: All configured origins were localhost — falling back to production defaults');
      return DEFAULT_PROD_ORIGINS;
    }
    if (filtered.length < origins.length) {
      logger.warn('CORS: Stripped localhost origins from production CORS config');
    }
    return filtered;
  }

  return envOrigins || DEFAULT_DEV_ORIGINS;
})();`
);

fs.writeFileSync(p, c);
console.log('CORS updated');
