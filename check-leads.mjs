import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

await client.connect();
const res = await client.query('SELECT email, source, score, company, created_at FROM leads ORDER BY created_at DESC LIMIT 20');
console.log(JSON.stringify(res.rows, null, 2));
await client.end();
