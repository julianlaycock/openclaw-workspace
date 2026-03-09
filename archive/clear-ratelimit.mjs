import pg from 'pg';
const pool = new pg.Pool({ connectionString: 'postgresql://postgres:RisaEULespGheopLYlUQlXcAJxGCNTEI@tramway.proxy.rlwy.net:33162/railway', ssl: { rejectUnauthorized: false } });
const r = await pool.query('DELETE FROM rate_limit_counters');
console.log('Cleared', r.rowCount, 'rate limit entries');
await pool.end();
