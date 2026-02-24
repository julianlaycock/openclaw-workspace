const sharp = require('./node_modules/sharp');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <rect width="300" height="300" fill="white"/>
  <text x="150" y="160" font-family="Arial Black, sans-serif" font-weight="900" font-size="58" fill="#2D3333" text-anchor="middle" letter-spacing="-3">Caelith</text>
</svg>`;
sharp(Buffer.from(svg)).png().toFile('logo-caelith-300.png').then(() => console.log('DONE: logo-caelith-300.png')).catch(e => console.error(e));
