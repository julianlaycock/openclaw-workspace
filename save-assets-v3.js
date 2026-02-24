const fs = require('fs');
const path = require('path');
const WebSocket = require(path.join(process.cwd(), 'node_modules/ws') || 'ws');

const targetId = '05B78B4A97CFCB0D011DDF251FEE84BE';
const wsUrl = `ws://127.0.0.1:18800/devtools/page/${targetId}`;

const downloadsDir = path.join('C:', 'Users', 'julia', 'Downloads');

const ws = new WebSocket(wsUrl);
let msgId = 1;

function send(method, params = {}) {
  const id = msgId++;
  return new Promise((resolve) => {
    const handler = (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.id === id) {
        ws.removeListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

ws.on('open', async () => {
  try {
    // Get the document
    const { root } = await send('DOM.getDocument');
    
    const selectors = [
      ['#logo-v2', 'caelith-logo-300.png'],
      ['#banner-v2', 'caelith-banner-1128x191.png']
    ];
    
    for (const [selector, filename] of selectors) {
      const { nodeId } = await send('DOM.querySelector', { nodeId: root.nodeId, selector });
      
      if (nodeId) {
        // Get box model to find the element bounds
        const { model } = await send('DOM.getBoxModel', { nodeId });
        const content = model.content;
        const x = content[0];
        const y = content[1];
        const width = content[2] - content[0];
        const height = content[5] - content[1];
        
        // Screenshot the viewport clipped to element
        const { data } = await send('Page.captureScreenshot', {
          format: 'png',
          clip: { x, y, width, height, scale: 2 }
        });
        
        fs.writeFileSync(path.join(downloadsDir, filename), Buffer.from(data, 'base64'));
        console.log('Saved:', filename);
      }
    }
  } catch (e) {
    console.error(e);
  }
  ws.close();
});
