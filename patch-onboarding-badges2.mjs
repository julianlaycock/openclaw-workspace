import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/onboarding/page.tsx';
let c = readFileSync(path, 'utf8');

// Move title to the wrapper span, not the Badge
c = c.replace(
  '<span className="flex-shrink-0"><Badge variant={STATUS_BADGE[rec.status] || \'gray\'} title={t(`enum.status.${rec.status}` as string) || rec.status}>{t(`enum.status.${rec.status}` as string) || rec.status}</Badge></span>',
  '<span className="flex-shrink-0" title={t(`enum.status.${rec.status}` as string) || rec.status}><Badge variant={STATUS_BADGE[rec.status] || \'gray\'}>{t(`enum.status.${rec.status}` as string) || rec.status}</Badge></span>'
);

writeFileSync(path, c, 'utf8');
console.log('Fixed: moved title to wrapper span');
