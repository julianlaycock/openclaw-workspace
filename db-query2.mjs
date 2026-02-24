import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:RisaEULespGheopLYlUQlXcAJxGCNTEI@tramway.proxy.rlwy.net:33162/railway');

async function run() {
  await c.connect();
  
  // Composite rules
  const composite = await c.query(`SELECT * FROM composite_rules ORDER BY name`);
  console.log('=== COMPOSITE RULES ===');
  console.log(JSON.stringify(composite.rows, null, 2));
  
  // Rules table
  const rules = await c.query(`SELECT * FROM rules ORDER BY name`);
  console.log('\n=== RULES ===');
  console.log(JSON.stringify(rules.rows, null, 2));
  
  // Audit trail
  const audit = await c.query(`SELECT * FROM audit_trail ORDER BY created_at DESC LIMIT 10`);
  console.log('\n=== AUDIT TRAIL (last 10) ===');
  console.log(JSON.stringify(audit.rows, null, 2));
  
  // Readiness
  const readiness = await c.query(`SELECT * FROM aifmd_readiness`);
  console.log('\n=== AIFMD READINESS ===');
  console.log(JSON.stringify(readiness.rows, null, 2));
  
  // Transfers with details
  const transfers = await c.query(`
    SELECT t.*, 
           fi.name as from_investor_name, ti.name as to_investor_name,
           a.name as asset_name
    FROM transfers t
    LEFT JOIN investors fi ON t.from_investor_id = fi.id
    LEFT JOIN investors ti ON t.to_investor_id = ti.id
    LEFT JOIN assets a ON t.asset_id = a.id
    ORDER BY t.created_at DESC
  `);
  console.log('\n=== TRANSFERS ===');
  console.log(JSON.stringify(transfers.rows, null, 2));
  
  // Investors detail
  const investors = await c.query(`
    SELECT i.id, i.name, i.investor_type, i.jurisdiction, i.kyc_status, i.kyc_expiry,
           COALESCE(SUM(h.units), 0) as total_holdings
    FROM investors i
    LEFT JOIN holdings h ON h.investor_id = i.id AND h.units > 0
    GROUP BY i.id
    ORDER BY i.name
  `);
  console.log('\n=== INVESTORS ===');
  console.log(JSON.stringify(investors.rows, null, 2));
  
  // Check fund AUM vs computed asset values
  const fundAum = await c.query(`
    SELECT fs.id, fs.name, fs.total_aum_eur,
           SUM(a.total_units * COALESCE(a.unit_price, 0)) as computed_total_value,
           SUM(COALESCE(h_sum.allocated, 0) * COALESCE(a.unit_price, 0)) as computed_nav
    FROM fund_structures fs
    LEFT JOIN assets a ON a.fund_structure_id = fs.id
    LEFT JOIN (
      SELECT asset_id, SUM(units) as allocated FROM holdings WHERE units > 0 GROUP BY asset_id
    ) h_sum ON h_sum.asset_id = a.id
    GROUP BY fs.id, fs.name, fs.total_aum_eur
    ORDER BY fs.name
  `);
  console.log('\n=== FUND AUM vs COMPUTED ===');
  for (const r of fundAum.rows) {
    console.log(`${r.name}: DB AUM=€${Number(r.total_aum_eur).toLocaleString()}, Computed GAV=€${Number(r.computed_total_value).toLocaleString()}, Computed NAV=€${Number(r.computed_nav).toLocaleString()}`);
  }

  // Decision records with details  
  const decisions = await c.query(`
    SELECT dr.id, dr.decision_type, dr.result, dr.subject_id, dr.asset_id, 
           dr.decided_at, dr.decided_by, dr.result_details,
           a.name as asset_name, i.name as subject_name
    FROM decision_records dr
    LEFT JOIN assets a ON dr.asset_id = a.id
    LEFT JOIN investors i ON dr.subject_id = i.id
    ORDER BY dr.decided_at DESC LIMIT 20
  `);
  console.log('\n=== DECISION RECORDS (detail) ===');
  console.log(JSON.stringify(decisions.rows, null, 2));

  // Compliance snapshots
  const snapshots = await c.query(`SELECT * FROM compliance_snapshots ORDER BY created_at DESC LIMIT 5`);
  console.log('\n=== COMPLIANCE SNAPSHOTS ===');
  console.log(JSON.stringify(snapshots.rows.map(r => ({...r, snapshot_data: '(truncated)'})), null, 2));

  await c.end();
}

run().catch(e => { console.error(e); process.exit(1); });
