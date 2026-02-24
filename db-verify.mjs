import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:RisaEULespGheopLYlUQlXcAJxGCNTEI@tramway.proxy.rlwy.net:33162/railway');

async function run() {
  await c.connect();

  // 1. Verify readiness score calculation
  const readiness = await c.query(`SELECT category, question_key, answer FROM aifmd_readiness WHERE tenant_id = '00000000-0000-0000-0000-000000000099'`);
  
  const weights = {
    del_register: 3, del_due_diligence: 2, del_eu_substance: 3, del_subdelegation: 2, del_review_cycle: 2,
    lmt_selected: 3, lmt_activation_rules: 3, lmt_investor_communication: 2, lmt_stress_testing: 2,
    rep_annex_iv: 3, rep_bafin_annual: 2, rep_data_quality: 2, rep_esma_readiness: 1,
    dis_cost_transparency: 3, dis_precontractual: 2, dis_lmt_info: 2, dis_fund_structure: 2,
    loan_applicable: 1, loan_retention: 2, loan_concentration: 2,
    gov_gap_analysis: 3, gov_project_team: 2, gov_regulatory_monitoring: 2, gov_kyc_current: 3
  };
  
  const answers = {};
  for (const r of readiness.rows) {
    const ans = typeof r.answer === 'string' ? JSON.parse(r.answer) : r.answer;
    answers[r.question_key] = ans.status;
  }
  
  console.log('=== READINESS ANSWERS ===');
  for (const [k, v] of Object.entries(answers)) {
    console.log(`  ${k}: ${v} (weight: ${weights[k]})`);
  }
  
  // Check if loan_applicable is na/no
  const loanSkipped = answers.loan_applicable === 'na' || answers.loan_applicable === 'no';
  
  const categories = {
    delegation: ['del_register', 'del_due_diligence', 'del_eu_substance', 'del_subdelegation', 'del_review_cycle'],
    liquidity: ['lmt_selected', 'lmt_activation_rules', 'lmt_investor_communication', 'lmt_stress_testing'],
    reporting: ['rep_annex_iv', 'rep_bafin_annual', 'rep_data_quality', 'rep_esma_readiness'],
    disclosure: ['dis_cost_transparency', 'dis_precontractual', 'dis_lmt_info', 'dis_fund_structure'],
    loan_origination: ['loan_applicable', 'loan_retention', 'loan_concentration'],
    governance: ['gov_gap_analysis', 'gov_project_team', 'gov_regulatory_monitoring', 'gov_kyc_current']
  };
  
  let totalWeighted = 0, totalMax = 0;
  console.log('\n=== CATEGORY SCORES ===');
  for (const [cat, keys] of Object.entries(categories)) {
    let catScore = 0, catMax = 0;
    for (const k of keys) {
      const dependsOnLoan = (k === 'loan_retention' || k === 'loan_concentration');
      if (dependsOnLoan && loanSkipped) continue;
      
      const status = answers[k] || 'unanswered';
      const isNa = status === 'na';
      const w = weights[k] || 1;
      
      if (!isNa) {
        catMax += w * 100;
        if (status === 'yes') catScore += w * 100;
        else if (status === 'partial') catScore += w * 50;
      }
    }
    const pct = catMax > 0 ? Math.round((catScore / catMax) * 100) : 100;
    console.log(`  ${cat}: ${catScore}/${catMax} = ${pct}%`);
    totalWeighted += catScore;
    totalMax += catMax;
  }
  const overall = totalMax > 0 ? Math.round((totalWeighted / totalMax) * 100) : 0;
  console.log(`\nOVERALL READINESS: ${overall}% (${totalWeighted}/${totalMax})`);

  // 2. Verify integrity chain
  const chain = await c.query(`
    SELECT id, sequence_number, integrity_hash, previous_hash 
    FROM decision_records 
    WHERE integrity_hash IS NOT NULL 
    ORDER BY sequence_number ASC
  `);
  console.log(`\n=== INTEGRITY CHAIN ===`);
  console.log(`Total sealed records: ${chain.rows.length}`);
  
  let prevHash = '0000000000000000000000000000000000000000000000000000000000000000';
  let chainValid = true;
  for (let i = 0; i < chain.rows.length; i++) {
    const r = chain.rows[i];
    if (r.previous_hash !== prevHash) {
      console.log(`CHAIN BROKEN at seq ${r.sequence_number}: expected prev=${prevHash}, got=${r.previous_hash}`);
      chainValid = false;
      break;
    }
    prevHash = r.integrity_hash;
  }
  if (chainValid) console.log(`Chain link consistency: VALID (all previous_hash values match)`);

  // 3. Check for unsealed records
  const unsealed = await c.query(`SELECT COUNT(*) as count FROM decision_records WHERE integrity_hash IS NULL`);
  console.log(`Unsealed records: ${unsealed.rows[0].count}`);

  // 4. Dashboard data consistency
  const fundCount = await c.query(`SELECT COUNT(*) as count FROM fund_structures WHERE tenant_id = '00000000-0000-0000-0000-000000000099' AND deleted_at IS NULL`);
  const invCount = await c.query(`SELECT COUNT(*) as count FROM investors WHERE tenant_id = '00000000-0000-0000-0000-000000000099'`);
  const totalAum = await c.query(`SELECT COALESCE(SUM(a.total_units), 0) as total FROM assets a JOIN fund_structures f ON a.fund_structure_id = f.id WHERE f.tenant_id = '00000000-0000-0000-0000-000000000099' AND a.deleted_at IS NULL AND f.deleted_at IS NULL`);
  const totalAllocated = await c.query(`SELECT COALESCE(SUM(h.units), 0) as total FROM holdings h JOIN assets a ON h.asset_id = a.id JOIN fund_structures f ON a.fund_structure_id = f.id WHERE f.tenant_id = '00000000-0000-0000-0000-000000000099' AND a.deleted_at IS NULL AND f.deleted_at IS NULL`);
  
  console.log('\n=== DASHBOARD CONSISTENCY ===');
  console.log(`Funds: ${fundCount.rows[0].count}`);
  console.log(`Investors: ${invCount.rows[0].count}`);
  console.log(`Total AUM (units): ${totalAum.rows[0].total}`);
  console.log(`Total Allocated (units): ${totalAllocated.rows[0].total}`);
  
  // Sum of fund-level EUR AUM
  const totalEurAum = await c.query(`SELECT COALESCE(SUM(total_aum_eur::numeric), 0) as total FROM fund_structures WHERE tenant_id = '00000000-0000-0000-0000-000000000099' AND deleted_at IS NULL`);
  console.log(`Total EUR AUM (sum of funds): €${Number(totalEurAum.rows[0].total).toLocaleString()}`);

  // 5. Check holdings percentages add up (per asset)
  console.log('\n=== HOLDINGS ALLOCATION CHECK ===');
  const holdingsCheck = await c.query(`
    SELECT a.name, a.total_units, COALESCE(SUM(h.units), 0) as allocated
    FROM assets a LEFT JOIN holdings h ON h.asset_id = a.id
    GROUP BY a.id, a.name, a.total_units ORDER BY a.name
  `);
  for (const r of holdingsCheck.rows) {
    const pct = r.total_units > 0 ? (Number(r.allocated) / r.total_units * 100).toFixed(1) : '0.0';
    const status = Number(r.allocated) <= r.total_units ? 'OK' : 'OVER-ALLOCATED!';
    console.log(`  ${r.name}: ${r.allocated}/${r.total_units} (${pct}%) ${status}`);
  }

  // 6. Check holdings with units=0 (should be cleaned up)
  const zeroHoldings = await c.query(`SELECT COUNT(*) as count FROM holdings WHERE units = 0`);
  console.log(`\nHoldings with 0 units: ${zeroHoldings.rows[0].count}`);

  // 7. Eligibility criteria minimum_investment stored in cents check
  const eligMin = await c.query(`SELECT fund_structure_id, investor_type, minimum_investment FROM eligibility_criteria WHERE minimum_investment > 0 ORDER BY minimum_investment DESC`);
  console.log('\n=== ELIGIBILITY MIN INVESTMENT (stored values) ===');
  for (const r of eligMin.rows) {
    const inEur = Number(r.minimum_investment) / 100;
    console.log(`  Fund ${r.fund_structure_id.substr(0,8)}... ${r.investor_type}: stored=${r.minimum_investment} (€${inEur.toLocaleString()})`);
  }
  
  // 8. Expired KYC investors with active holdings
  const expiredActive = await c.query(`
    SELECT i.name, i.kyc_status, i.kyc_expiry, SUM(h.units) as holdings
    FROM investors i JOIN holdings h ON h.investor_id = i.id
    WHERE h.units > 0 AND (i.kyc_status = 'expired' OR (i.kyc_expiry IS NOT NULL AND i.kyc_expiry < NOW()))
    GROUP BY i.id, i.name, i.kyc_status, i.kyc_expiry
  `);
  console.log('\n=== EXPIRED KYC WITH ACTIVE HOLDINGS ===');
  for (const r of expiredActive.rows) {
    console.log(`  ${r.name}: kyc=${r.kyc_status}, expiry=${r.kyc_expiry}, holdings=${r.holdings}`);
  }

  await c.end();
}

run().catch(e => { console.error(e); process.exit(1); });
