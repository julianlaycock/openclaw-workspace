import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.OPENAI_API_KEY;

const prompts = [
  // 1. Geometric C monogram — shield/chain
  `Minimalist premium logo icon for a fintech brand called "Caelith". Abstract geometric letter C formed by two overlapping angular shapes suggesting a shield and chain link. Ultra-clean single-color mark in dark charcoal (#2D3333) on a pure white background. Flat vector style, no gradients, no text, no wordmark. Inspired by Stripe, Linear, Vercel logo simplicity. The mark should work at 16px favicon size.`,

  // 2. Interlocking nodes — compliance network
  `Premium tech logo icon: three connected nodes forming a minimal triangle/delta shape, representing a compliance verification network. Clean geometric lines, nodes as small circles connected by thin precise lines. Single color: dark charcoal (#2D3333) on white background. No text, no wordmark, no gradients. Ultra-minimal, Silicon Valley aesthetic like Figma or Abstract logos. Must work as a small favicon.`,

  // 3. Abstract hash chain — crypto proof
  `Minimalist logo mark: an abstract symbol suggesting a hash chain or linked blocks — two or three interlocking rectangular forms creating a continuous chain. Clean geometric construction, sharp corners. Dark charcoal (#2D3333) on white background. No text, no gradients, flat vector. Premium fintech aesthetic like Plaid or Ramp logos. Single icon, must scale to favicon.`,

  // 4. Lettermark C with data flow
  `Ultra-minimal lettermark logo: the letter C with a horizontal line or arrow cutting through it, suggesting data flow or verification. Geometric, constructed from basic shapes (arcs, lines). Dark charcoal (#2D3333) on white. No serif, no decorative elements, no text besides the C itself. Clean tech aesthetic like Coinbase or Clerk logos. Must work at very small sizes.`,

  // 5. Shield + check — trust/compliance
  `Premium minimal logo icon: a simplified shield outline with a single check mark or verification tick integrated into its form. Not literal — abstracted to geometric essence. Clean lines, dark charcoal (#2D3333) on white background. No gradients, no 3D, no text. Sophisticated fintech aesthetic, not corporate or clipart. Think Notion or 1Password level of design refinement.`,

  // 6. Monoline C — editorial premium
  `Elegant monoline logo: letter C drawn with a single continuous line of uniform weight, with a subtle break or notch suggesting precision/engineering. Dark charcoal (#2D3333) on white background. No fill, just stroke. Ultra-refined, editorial quality. No text, no extra elements. Premium SaaS aesthetic like Mercury or Loom logos. Must be recognizable at favicon size.`
];

async function generateLogo(prompt, index) {
  console.log(`Generating logo ${index + 1}/6...`);
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'high',
      background: 'transparent',
      output_format: 'png'
    })
  });
  const json = await res.json();
  if (json.error) { console.error(`Error on ${index+1}:`, json.error.message); return null; }
  const b64 = json.data[0].b64_json;
  const filename = `logo-${index + 1}.png`;
  fs.writeFileSync(path.join(__dirname, filename), Buffer.from(b64, 'base64'));
  console.log(`  Saved ${filename}`);
  return filename;
}

async function main() {
  const results = [];
  for (let i = 0; i < prompts.length; i++) {
    const f = await generateLogo(prompts[i], i);
    if (f) results.push(f);
  }
  // Generate gallery HTML
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Caelith Logo Concepts</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#f8f9fa;padding:40px}
h1{font-size:24px;margin-bottom:8px;color:#2D3333}p.sub{color:#888;margin-bottom:32px;font-size:14px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.card{background:#fff;border-radius:12px;padding:32px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.06);transition:transform .2s}
.card:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,0.1)}
.card img{width:200px;height:200px;object-fit:contain;margin-bottom:16px}
.card h3{font-size:14px;color:#2D3333;margin-bottom:4px}
.card p{font-size:12px;color:#999;line-height:1.5}
.brand-bar{display:flex;align-items:center;gap:12px;margin-bottom:24px;padding:16px;background:#2D3333;border-radius:8px}
.brand-bar span{color:#C5E0EE;font-size:12px;font-family:monospace}
</style></head><body>
<h1>Caelith — Logo Concepts</h1>
<p class="sub">6 directions exploring geometric, minimal, premium fintech identity</p>
<div class="brand-bar">
  <span>#2D3333</span><span>·</span><span>#C5E0EE</span><span>·</span><span>#F8F9FA</span><span>·</span><span>#E8A87C</span>
</div>
<div class="grid">
  <div class="card"><img src="logo-1.png"><h3>1 — Geometric C Monogram</h3><p>Shield + chain link intersection</p></div>
  <div class="card"><img src="logo-2.png"><h3>2 — Node Network</h3><p>Connected compliance verification</p></div>
  <div class="card"><img src="logo-3.png"><h3>3 — Hash Chain</h3><p>Interlocking blocks, crypto proof</p></div>
  <div class="card"><img src="logo-4.png"><h3>4 — C with Data Flow</h3><p>Lettermark with verification arrow</p></div>
  <div class="card"><img src="logo-5.png"><h3>5 — Shield + Check</h3><p>Abstract trust/compliance mark</p></div>
  <div class="card"><img src="logo-6.png"><h3>6 — Monoline C</h3><p>Editorial single-stroke precision</p></div>
</div></body></html>`;
  fs.writeFileSync(path.join(__dirname, 'index.html'), html);
  console.log('Gallery saved to index.html');
}

main().catch(console.error);
