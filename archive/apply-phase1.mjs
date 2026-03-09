import { readFileSync, writeFileSync } from 'fs';

const files = [
  'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-en.ts',
  'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-de.ts'
];

for (const f of files) {
  console.log(`Processing ${f}...`);
  let c = readFileSync(f, 'utf8');

  // 1. Arrow animation: 3px -> 4px
  c = c.replace(/translateX\(3px\)/g, 'translateX(4px)');

  // 2. Hero gradient overlay
  c = c.replace(
    'background:#2D3333;height:100vh',
    'background:radial-gradient(ellipse at 30% 0%, rgba(200,230,240,0.3) 0%, transparent 60%), #2D3333;height:100vh'
  );

  // 3. Morphing navbar CSS — inject before </style>
  const navCSS = `.nav-wrap{position:fixed;top:0;left:0;right:0;z-index:1000;padding:8px 16px;transition:all .4s cubic-bezier(.4,0,.2,1)}.nav-scrolled .nav-wrap,.nav-scrolled nav{max-width:900px;margin:0 auto}.nav-scrolled{background:rgba(25,30,30,0.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;margin:12px auto;box-shadow:0 4px 24px rgba(0,0,0,0.25)}`;
  
  // Find the closing </style> and inject before it
  const styleCloseIdx = c.lastIndexOf('</style>');
  if (styleCloseIdx > -1) {
    // Check if already injected
    if (!c.includes('.nav-scrolled')) {
      c = c.slice(0, styleCloseIdx) + '\\n' + navCSS + '\\n' + c.slice(styleCloseIdx);
      console.log('  + Navbar CSS injected');
    }
  }

  // 4. Lenis + scroll listener — inject before </body>
  const lenisScript = `<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"><\\/script>\\n<script>const lenis=new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});function raf(time){lenis.raf(time);requestAnimationFrame(raf)}requestAnimationFrame(raf);(function(){var header=document.querySelector("header")||document.querySelector("nav");if(header){var wrap=header.parentElement;window.addEventListener("scroll",function(){if(window.scrollY>50){wrap.classList.add("nav-scrolled")}else{wrap.classList.remove("nav-scrolled")}})}})()<\\/script>`;
  
  const bodyCloseIdx = c.lastIndexOf('</body>');
  if (bodyCloseIdx > -1) {
    if (!c.includes('lenis@1.1.18')) {
      c = c.slice(0, bodyCloseIdx) + lenisScript + '\\n' + c.slice(bodyCloseIdx);
      console.log('  + Lenis + scroll listener injected');
    }
  }

  writeFileSync(f, c, 'utf8');
  console.log(`  Done. Length: ${c.length}`);
}

console.log('All files updated.');
