const fs = require('fs');
const path = require('path');
const WebSocket = require(path.join(process.cwd(), 'node_modules/ws'));

const targetId = '05B78B4A97CFCB0D011DDF251FEE84BE';
const wsUrl = `ws://127.0.0.1:18800/devtools/page/${targetId}`;
const downloadsDir = path.join('C:', 'Users', 'julia', 'Downloads');

const ws = new WebSocket(wsUrl);
let msgId = 1;

function send(method, params = {}) {
  const id = msgId++;
  return new Promise((resolve, reject) => {
    const handler = (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.id === id) {
        ws.removeListener('message', handler);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

ws.on('open', async () => {
  try {
    // Use Runtime.evaluate to render with html2canvas and get base64
    const script = `
      (async () => {
        const { default: html2canvas } = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
        const results = {};
        for (const id of ['logo-v2', 'banner-v2']) {
          const el = document.getElementById(id);
          const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null });
          results[id] = canvas.toDataURL('image/png').split(',')[1];
        }
        return JSON.stringify(results);
      })()
    `;

    const { result } = await send('Runtime.evaluate', {
      expression: script,
      awaitPromise: true,
      returnByValue: true
    });

    const data = JSON.parse(result.value);

    for (const [key, b64] of Object.entries(data)) {
      const filename = key === 'logo-v2' ? 'caelith-logo-300.png' : 'caelith-banner-1128x191.png';
      fs.writeFileSync(path.join(downloadsDir, filename), Buffer.from(b64, 'base64'));
      console.log('Saved:', path.join(downloadsDir, filename));
    }

  } catch (e) {
    console.error(e);
  }
  ws.close();
});
