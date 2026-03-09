import { readFileSync } from 'fs';
const content = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');

// 1. Find current lang toggle HTML
const toggleIdx = content.indexOf('lang-toggle');
if (toggleIdx > -1) console.log('Lang toggle:\n', content.substring(Math.max(0, toggleIdx - 100), toggleIdx + 400));

// 2. Find the landing page lang toggle for comparison
// Also check what .lang-toggle CSS looks like
const cssIdx = content.indexOf('.lang-toggle');
if (cssIdx > -1) console.log('\nLang toggle CSS:\n', content.substring(cssIdx, cssIdx + 300));

// 3. Find where results CTA is (our new block)
const ctaIdx = content.indexOf('Recommended next steps ready');
if (ctaIdx > -1) console.log('\nResults CTA block:\n', content.substring(Math.max(0, ctaIdx - 300), ctaIdx + 800));

// 4. Find the results screen container
const resultsIdx = content.indexOf('screen-results');
if (resultsIdx > -1) console.log('\nResults screen:\n', content.substring(resultsIdx, resultsIdx + 200));
