# Caelith Pitch Deck

Interactive HTML pitch deck optimized for incubators and VCs.

## View locally
Open `index.html` in any browser. Press F for fullscreen.

**Controls:**
- `← →` / Swipe / Scroll — navigate slides
- `F` — toggle fullscreen
- `N` — toggle presenter notes
- `Home` / `End` — first/last slide
- `↓ PDF` button (bottom-left) — browser print-to-PDF

## Generate PDF (pixel-perfect)
```bash
npm install puppeteer
node generate-pdf.mjs
# → caelith-pitch-deck.pdf (1920×1080, 16:9, one slide per page)
```

## Free hosting options (share as a link)

### Option 1: Netlify (recommended — 30 seconds)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `pitch-deck` folder onto the page
3. Done. You get a URL like `https://random-name.netlify.app`
4. Optionally set a custom subdomain in site settings

**Or via CLI:**
```bash
npx netlify-cli deploy --dir=. --prod
```

### Option 2: Vercel
```bash
npx vercel --prod
```

### Option 3: GitHub Pages
1. Create a repo: `gh repo create caelith-pitch-deck --public`
2. Push `index.html`
3. Enable Pages in repo Settings → Pages → Deploy from main branch
4. URL: `https://yourusername.github.io/caelith-pitch-deck/`

### Option 4: Cloudflare Pages
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Create project → Upload assets → drop `index.html`
3. Free custom domain support included

## Brand
- Palette: `#2D3333` · `#C5E0EE` · `#F8F9FA` · `#E8A87C`
- Fonts: Sora 800, Instrument Sans 700, JetBrains Mono
- 14 slides, self-contained HTML (no external deps except Google Fonts)
