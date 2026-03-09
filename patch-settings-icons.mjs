import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/settings/page.tsx';
let c = readFileSync(path, 'utf8');

// Fix Security icon - replace incomplete shackle path with full shield icon (consistent with sidebar)
c = c.replace(
  "{ id: 'security' as Section, labelKey: 'settings.security', icon: 'M7 11V7a5 5 0 0110 0v4' }",
  "{ id: 'security' as Section, labelKey: 'settings.security', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' }"
);

// Fix Data Management icon - replace incomplete cylinder path with proper database icon
c = c.replace(
  "{ id: 'data' as Section, labelKey: 'settings.dataManagement', icon: 'M12 5a9 3 0 019 3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5' }",
  "{ id: 'data' as Section, labelKey: 'settings.dataManagement', icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125' }"
);

writeFileSync(path, c, 'utf8');
console.log('Updated settings icons: Security (shield) + Data Management (database)');
