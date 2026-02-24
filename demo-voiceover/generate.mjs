import https from 'https';
import fs from 'fs';

const key = process.env.OPENAI_API_KEY;
const dir = 'C:/Users/julia/openclaw-workspace/demo-voiceover';

function generate(voice, text, outFile) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ model: 'tts-1-hd', input: text, voice, response_format: 'mp3', speed: 0.95 });
    const req = https.request({
      hostname: 'api.openai.com', path: '/v1/audio/speech', method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(outFile, buf);
        console.log(outFile.split('/').pop() + ': ' + buf.length + ' bytes');
        resolve();
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const segments = [
  {
    name: '01-hook',
    text: `AIFMD II takes effect in April 2026.

Most fund managers are still tracking compliance in spreadsheets. Manually. Error-prone. And expensive.

There is a better way.

This is Caelith.`
  },
  {
    name: '02-dashboard',
    text: `One screen. Five funds. Total assets under management: over eight hundred million euros.

You see your compliance posture instantly. What is green. What needs attention.

This fund is flagged. Evergreen RAIF Beta. Norges Bank Investment Management holds fifty-five percent of a single share class. That is a concentration risk that most managers would not catch until an audit.

Below the fund cards, live regulatory news. BaFin, ESMA, and the ECB. Filtered to what actually matters to your portfolio. No noise.

Five different fund structures. SIF, RAIF, Spezial-AIF, QIAIF, and ELTIF. Each with its own regulatory framework. Caelith handles all of them.`
  },
  {
    name: '03-fund-detail-rules',
    text: `Let us open the fund that was flagged. Evergreen RAIF Beta.

Everything in one place. Fund structure, depositary, BNP Paribas Securities Services, one hundred seventy million euros in AUM. Leverage at three point two x, against a four x limit.

Here is something most tools miss entirely. Delegation monitoring.

This fund outsources IT infrastructure to TechOps Outsourcing, based in Singapore. Flagged as high letterbox risk. A red flag under AIFMD II.

Now the rule engine. Thirteen codified rules from AIFMD II, KAGB, and EU delegated regulations. Every check shows pass or fail, the exact legal paragraph, and what to do about it.

No PDFs. No guesswork. The system tells your compliance team exactly what is wrong, and how to fix it. In plain language.`
  },
  {
    name: '04-readiness',
    text: `The AIFMD II Readiness Assessment.

Twenty-four questions across six categories. Delegation. Liquidity. Reporting. Disclosure. Loan origination. Governance.

This fund group scores around seventy percent ready. Most categories are green. But delegation substance is red. That Singapore outsourcing needs remediation before April.

Click into any question and you see notes, evidence, and action items. Think of it as a pre-audit. You know what BaFin will ask, before they ask it.`
  },
  {
    name: '05-reports',
    text: `Regulatory reporting.

The Annex IV report generates automatically. ESMA-compliant XML, ready for BaFin upload. AUM in euros. Leverage calculations. Sub-asset type codes. All populated.

What used to take a compliance officer two hours is done in thirty seconds. Every field sourced from your live fund data.

And the evidence bundle. It packages rules, findings, data sources, and timestamps into one audit-ready PDF. When the regulator calls, you hand them this.`
  },
  {
    name: '06-screening',
    text: `Investor screening.

Twenty-five investors screened automatically against sanctions lists and PEP databases.

Flagged results surface with match confidence scores. Van der Berg Holding, Li Wei Zhang, Miguel Santos, all flagged for expired KYC documentation.

Compliance officers review each flag, confirm or dismiss, and every action is logged in an immutable audit trail. No more spreadsheet sign-offs.`
  },
  {
    name: '07-copilot',
    text: `The Compliance Copilot.

Ask it a real question. Which funds have fewer than two liquidity management tools? That is an AIFMD II Article 16 requirement.

It queries your actual fund data. LMTs, delegations, investor profiles. And gives you a specific, sourced answer.

Horizon ELTIF 2.0 Epsilon has only one active liquidity management tool. That is non-compliant.

Not generic AI. Compliance intelligence, built on your data.`
  },
  {
    name: '08-close',
    text: `Caelith.

Compliance automation for EU fund managers.

The AIFMD II deadline is closer than you think.

Book a pilot at caelith dot tech.`
  }
];

async function main() {
  for (const seg of segments) {
    await generate('nova', seg.text, `${dir}/${seg.name}-nova.mp3`);
  }
  console.log('\nAll segments done. Merging...');

  const bufs = [];
  // Create ~2s silence buffer (MP3 silence frame repeated)
  // At 128kbps MP3, 2 seconds = ~32KB. We use a minimal valid silent MP3 frame.
  // Simpler: just rely on the paragraph breaks in the text for natural pauses.
  for (let i = 0; i < segments.length; i++) {
    bufs.push(fs.readFileSync(`${dir}/${segments[i].name}-nova.mp3`));
  }
  const full = Buffer.concat(bufs);
  fs.writeFileSync(`${dir}/caelith-demo-nova-full.mp3`, full);
  console.log(`\nFull voiceover: caelith-demo-nova-full.mp3 (${full.length} bytes, ~${Math.round(full.length / 16000)}s)`);
}

main().catch(e => { console.error(e); process.exit(1); });
