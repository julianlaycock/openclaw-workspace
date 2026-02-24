const fs = require('fs');
const path = require('path');

const downloadsDir = path.join('C:', 'Users', 'julia', 'Downloads');

// Read the base64 data from the evaluate result (passed as args)
const logoB64 = process.argv[2];
const bannerB64 = process.argv[3];

fs.writeFileSync(path.join(downloadsDir, 'caelith-logo-300.png'), Buffer.from(logoB64, 'base64'));
fs.writeFileSync(path.join(downloadsDir, 'caelith-banner-1128x191.png'), Buffer.from(bannerB64, 'base64'));

console.log('Saved both files to Downloads folder!');
