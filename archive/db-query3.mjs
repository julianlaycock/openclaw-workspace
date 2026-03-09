import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:RisaEULespGheopLYlUQlXcAJxGCNTEI@tramway.proxy.rlwy.net:33162/railway');

async function run() {
  await c.connect();
  
  // Rules table schema
  const rulesCols = await c.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name='rules' ORDER BY ordinal_position`);
  console.log('=== RULES COLUMNS ===');
  console.log(JSON.stringify(rulesCols.rows));
  
  // Rules data
  const rules = await c.query(`SELECT * FROM rules LIMIT 10`);
  console.log('\n=== RULES (sample) ===');
  console.log(JSON.stringify(rules.rows, null, 2));
  
  // Audit trail
  const auditCols = await c.query(`SELECT column_name FROM information_schema.columns WHERE table_name='audit_trail' ORDER BY ordinal_position`);
  console.log('\n=== AUDIT_TRAIL COLUMNS ===');
  console.log(JSON.stringify(auditCols.rows.map(r=>r.column_name)));
  
  const audit = await c.query(`SELECT * FROM audit_trail ORDER BY created_at DESC LIMIT 5`);
  console.log('\n=== AUDIT TRAIL ===');
  console.log(JSON.stringify(audit.rows, null, 2));
  
  // Readiness
  const readiness = await c.query(`SELECT * FROM aifmd_readiness LIMIT 20`);
  console.log('\n=== AIFMD READINESS ===');
  console.log(JSON.stringify(readiness.rows, null, 2));
  
  // Transfers
  const transfers = await c.query(`
    SELECT t.*, fi.name as from_name, ti.name as to_name, a.name as asset_name
    FROM transfers t
    LEFT JOIN investors fi ON t.from_investor_id = fi.id
    LEFT JOIN investors ti ON t.to_investor_id = ti.id
    LEFT JOIN assets a ON t.asset_id = a.id
    ORDER BY t.created_at DESC
  `);
  console.log('\n=== TRANSFERS ===');
  console.log(JSON.stringify(transfers.rows, null, 2));
  
  // Investors
  const investors = await c.query(`
    SELECT i.id, i.name, i.investor_type, i.jurisdiction, i.kyc_status, i.kyc_expiry,
           COALESCE(SUM(h.units), 0) as total_holdings
    FROM investors i
    LEFT JOIN holdings h ON h.investor_id = i.id AND h.units > 0
    GROUP BY i.id ORDER BY i.name
  `);
  console.log('\n=== INVESTORS ===');
  console.log(JSON.stringify(investors.rows, null, 2));
  
  // Fund AUM vs computed
  const fundAum = await c.query(`
    SELECT fs.id, fs.name, fs.total_aum_eur,
           SUM(a.total_units * COALESCE(a.unit_price, 0)) as computed_gav,
           SUM(COALESCE(h_sum.allocated, 0) * COALESCE(a.unit_price, 0)) as computed_nav
    FROM fund_structures fs
    LEFT JOIN assets a ON a.fund_structure_id = fs.id
    LEFT JOIN (SELECT asset_id, SUM(units) as allocated FROM holdings WHERE units > 0 GROUP BY asset_id) h_sum ON h_sum.asset_id = a.id
    GROUP BY fs.id, fs.name, fs.total_aum_eur ORDER BY fs.name
  `);
  console.log('\n=== FUND AUM vs COMPUTED ===');
  for (const r of fundAum.rows) {
    console.log(`${r.name}: DB_AUM=€${Number(r.total_aum_eur).toLocaleString()}, GAV=€${Number(r.computed_gav).toLocaleString()}, NAV=€${Number(r.computed_nav).toLocaleString()}`);
  }

  // Decision records detail
  const decisions = await c.query(`SELECT * FROM decision_records ORDER BY decided_at DESC LIMIT 10`);
  console.log('\n=== DECISION RECORDS ===');
  console.log(JSON.stringify(decisions.rows, null, 2));

  await c.end();
}

run().catch(e => { console.error(e); process.exit(1); });
