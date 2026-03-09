import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/components/sidebar.tsx';
let c = readFileSync(path, 'utf8');

// Remove the separate 'lg:h-full' comment+line we added via PowerShell (messy approach)
c = c.replace(
  `'group/sidebar fixed z-50 flex h-dvh flex-col transition-all duration-250 lg:static lg:translate-x-0',\n        /* Fix: lg:h-full so sidebar doesn't overflow when demo banner is present */\n        'lg:h-full',`,
  `'group/sidebar fixed z-50 flex h-dvh flex-col transition-all duration-250 lg:static lg:translate-x-0 lg:h-full',`
);

writeFileSync(path, c, 'utf8');
console.log('Fixed sidebar: lg:h-full now inline in the class string');

// Verify
const result = readFileSync(path, 'utf8');
const hasInline = result.includes('lg:static lg:translate-x-0 lg:h-full');
console.log('Inline class present:', hasInline);
