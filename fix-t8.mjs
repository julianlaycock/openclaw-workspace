import { readFileSync, writeFileSync } from 'fs';
const f = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/e2e/full-qa.spec.ts';
let c = readFileSync(f, 'utf8');

const OLD = `[...document.querySelectorAll('a[href^="#"]')]
      .map(a => ({ href: a.getAttribute('href')!, exists: !!document.querySelector(a.getAttribute('href')!) }))
      .filter(a => !a.exists && a.href !== '#')`;

const NEW = `[...document.querySelectorAll('a[href^="#"]')]
      .filter(a => a.getAttribute('href') !== '#') // skip bare # — valid inert links
      .map(a => ({ href: a.getAttribute('href')!, exists: !!document.querySelector(a.getAttribute('href')!) }))
      .filter(a => !a.exists)`;

c = c.replace(OLD, NEW);
writeFileSync(f, c, 'utf8');
console.log('Fixed:', c.includes("filter(a => a.getAttribute('href') !== '#')") ? '✓' : '✗ MISS');
