import fs from 'fs';
let h = fs.readFileSync('C:/Users/julia/openclaw-workspace/pitch-deck/index.html','utf8');

// Fix data-slide indices (gap at 7, old 8-12 become 7-11)
h = h.replace(/data-slide="8"/g, 'data-slide="7"');
h = h.replace(/data-slide="9"/g, 'data-slide="8"');
h = h.replace(/data-slide="10"/g, 'data-slide="9"');
h = h.replace(/data-slide="11"/g, 'data-slide="10"');
h = h.replace(/data-slide="12"/g, 'data-slide="11"');

// Fix slide numbers (all should be XX / 12)
h = h.replace(/05 \/ 12/g, '05 / 12'); // already correct
h = h.replace(/06 \/ 14/g, '06 / 12');
h = h.replace(/07 \/ 14/g, '07 / 12');
h = h.replace(/09 \/ 14/g, '08 / 12');
h = h.replace(/10 \/ 14/g, '09 / 12');
h = h.replace(/11 \/ 14/g, '10 / 12');
h = h.replace(/12 \/ 14/g, '11 / 12');
h = h.replace(/13 \/ 14/g, '12 / 12');

// Fix counter default text
h = h.replace(/1 \/ 14/g, '1 / 12');

fs.writeFileSync('C:/Users/julia/openclaw-workspace/pitch-deck/index.html', h);
console.log('Fixed all slide numbers');
