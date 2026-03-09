require('dotenv').config({path: 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\.env'});
const {Pool} = require('pg');
const p = new Pool({connectionString: process.env.DATABASE_URL});
(async () => {
  const r = await p.query("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename");
  r.rows.forEach(x => console.log(x.tablename));
  console.log('---');
  for (const t of r.rows.map(x=>x.tablename)) {
    try {
      const c = await p.query(`SELECT COUNT(*) FROM "${t}"`);
      console.log(`${t}: ${c.rows[0].count}`);
    } catch(e) { console.log(`${t}: ERR`); }
  }
  await p.end();
})();
