const fs = require('fs');
const path = require('path');
const http = require('http');

// Start a tiny server to receive the base64 data from the browser
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(200);
      res.end('OK');
      
      const data = JSON.parse(body);
      const downloadsDir = path.join('C:', 'Users', 'julia', 'Downloads');
      
      for (const [key, val] of Object.entries(data)) {
        const b64 = val.replace(/^data:image\/png;base64,/, '');
        const filename = key + '.png';
        fs.writeFileSync(path.join(downloadsDir, filename), Buffer.from(b64, 'base64'));
        console.log('Saved:', filename);
      }
      
      server.close();
      process.exit(0);
    });
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(200);
    res.end('OK');
  }
});

server.listen(19876, () => console.log('Ready on port 19876'));
