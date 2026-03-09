import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/onboarding/page.tsx';
let c = readFileSync(path, 'utf8');

// Fix: investor name should truncate, badge should be flex-shrink-0 with max-w constraint
// Current: <div className="flex items-start justify-between gap-1">
//   <p className="text-sm font-medium text-ink leading-tight">
//   <Badge ...>{status}</Badge>
// Fix: make the name truncatable and badge not shrink
c = c.replace(
  '<div className="flex items-start justify-between gap-1">\n                        <p className="text-sm font-medium text-ink leading-tight">',
  '<div className="flex items-start justify-between gap-1 min-w-0">\n                        <p className="text-sm font-medium text-ink leading-tight truncate min-w-0 flex-1 mr-1">'
);

// Also add title attribute to the badge for hover tooltip
// The Badge renders the status translation - add flex-shrink-0 wrapper
c = c.replace(
  '<Badge variant={STATUS_BADGE[rec.status] || \'gray\'}>{t(`enum.status.${rec.status}` as string) || rec.status}</Badge>',
  '<span className="flex-shrink-0"><Badge variant={STATUS_BADGE[rec.status] || \'gray\'} title={t(`enum.status.${rec.status}` as string) || rec.status}>{t(`enum.status.${rec.status}` as string) || rec.status}</Badge></span>'
);

writeFileSync(path, c, 'utf8');
console.log('Fixed onboarding badge overflow - investor name truncates, badge flex-shrink-0');
