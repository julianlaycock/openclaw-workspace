import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:RisaEULespGheopLYlUQlXcAJxGCNTEI@tramway.proxy.rlwy.net:33162/railway');

async function run() {
  await c.connect();
  
  // Tables
  const tables = await c.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`);
  console.log('=== TABLES ===');
  console.log(tables.rows.map(x => x.table_name).join('\n'));
  
  // Funds
  const funds = await c.query(`SELECT id, name, legal_form, domicile, status, total_aum_eur, currency FROM fund_structures ORDER BY name`);
  console.log('\n=== FUNDS ===');
  console.log(JSON.stringify(funds.rows, null, 2));
  
  // Fund count
  console.log('\nFund count:', funds.rows.length);
  
  // Investors count
  const inv = await c.query(`SELECT COUNT(*) as count FROM investors`);
  console.log('Investor count:', inv.rows[0].count);
  
  // Holdings summary
  const holdings = await c.query(`SELECT COUNT(*) as count, SUM(units) as total_units FROM holdings WHERE units > 0`);
  console.log('Holdings:', JSON.stringify(holdings.rows[0]));
  
  // Assets
  const assets = await c.query(`SELECT a.id, a.name, a.fund_structure_id, a.total_units, a.unit_price, a.asset_type FROM assets a ORDER BY a.name`);
  console.log('\n=== ASSETS ===');
  console.log(JSON.stringify(assets.rows, null, 2));
  
  // Holdings per asset - check allocation percentages
  const holdingsPerAsset = await c.query(`
    SELECT a.name as asset_name, a.total_units, 
           COALESCE(SUM(h.units), 0) as allocated_units,
           COUNT(DISTINCT h.investor_id) FILTER (WHERE h.units > 0) as holder_count
    FROM assets a
    LEFT JOIN holdings h ON h.asset_id = a.id
    GROUP BY a.id, a.name, a.total_units
    ORDER BY a.name
  `);
  console.log('\n=== HOLDINGS PER ASSET ===');
  for (const r of holdingsPerAsset.rows) {
    const pct = r.total_units > 0 ? (Number(r.allocated_units) / r.total_units * 100).toFixed(1) : '0.0';
    console.log(`${r.asset_name}: ${r.allocated_units}/${r.total_units} (${pct}%) - ${r.holder_count} holders`);
  }
  
  // Negative holdings check
  const negHoldings = await c.query(`SELECT * FROM holdings WHERE units < 0`);
  console.log('\nNegative holdings:', negHoldings.rows.length);
  
  // Investors with 0 holdings
  const orphanInvestors = await c.query(`
    SELECT i.id, i.name FROM investors i 
    LEFT JOIN holdings h ON h.investor_id = i.id AND h.units > 0
    WHERE h.id IS NULL
  `);
  console.log('\nOrphan investors (0 holdings):', orphanInvestors.rows.length);
  if (orphanInvestors.rows.length > 0) console.log(JSON.stringify(orphanInvestors.rows));
  
  // KYC statuses
  const kyc = await c.query(`SELECT kyc_status, COUNT(*) as count FROM investors GROUP BY kyc_status`);
  console.log('\n=== KYC STATUS ===');
  console.log(JSON.stringify(kyc.rows));
  
  // KYC expiry issues - expired but verified
  const kycExpired = await c.query(`
    SELECT id, name, kyc_status, kyc_expiry 
    FROM investors 
    WHERE kyc_status = 'verified' AND kyc_expiry < NOW()
  `);
  console.log('\nExpired KYC but still "verified":', kycExpired.rows.length);
  if (kycExpired.rows.length > 0) console.log(JSON.stringify(kycExpired.rows.slice(0, 5)));
  
  // Transfers
  const transfers = await c.query(`SELECT COUNT(*) as count FROM transfers`);
  console.log('\nTransfer count:', transfers.rows[0].count);
  
  // Negative transfers
  const negTransfers = await c.query(`SELECT * FROM transfers WHERE units < 0`);
  console.log('Negative transfers:', negTransfers.rows.length);
  
  // Audit trail
  const events = await c.query(`SELECT event_type, COUNT(*) as count FROM events GROUP BY event_type ORDER BY count DESC LIMIT 20`);
  console.log('\n=== EVENT TYPES ===');
  console.log(JSON.stringify(events.rows));
  
  // Decision records
  const decisions = await c.query(`SELECT decision_type, result, COUNT(*) as count FROM decision_records GROUP BY decision_type, result ORDER BY decision_type, result`);
  console.log('\n=== DECISION RECORDS ===');
  console.log(JSON.stringify(decisions.rows));
  
  // Onboarding statuses
  const onboarding = await c.query(`SELECT status, COUNT(*) as count FROM onboarding_records GROUP BY status ORDER BY count DESC`);
  console.log('\n=== ONBOARDING PIPELINE ===');
  console.log(JSON.stringify(onboarding.rows));
  
  // Check for readiness assessment
  const readiness = await c.query(`SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%readiness%' OR table_name LIKE '%assessment%'`);
  console.log('\nReadiness tables:', JSON.stringify(readiness.rows));
  
  // Eligibility criteria
  const elig = await c.query(`SELECT * FROM eligibility_criteria ORDER BY fund_structure_id`);
  console.log('\n=== ELIGIBILITY CRITERIA ===');
  console.log(JSON.stringify(elig.rows, null, 2));
  
  // Rule sets
  const rules = await c.query(`SELECT * FROM rule_sets ORDER BY asset_id`);
  console.log('\n=== RULE SETS ===');
  console.log(JSON.stringify(rules.rows, null, 2));

  // Composite rules
  const compositeExists = await c.query(`SELECT table_name FROM information_schema.tables WHERE table_name = 'composite_rules'`);
  if (compositeExists.rows.length > 0) {
    const composite = await c.query(`SELECT * FROM composite_rules`);
    console.log('\n=== COMPOSITE RULES ===');
    console.log(JSON.stringify(composite.rows, null, 2));
  }

  await c.end();
}

run().catch(e => { console.error(e); process.exit(1); });
