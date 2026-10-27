const http = require('http');
const { spawn } = require('child_process');

async function testRender() {
  // Start headless Chrome
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  console.log('Launching headless Chrome...');
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--user-data-dir=' + require('os').tmpdir() + '\\chrome-test-profile-' + Date.now(),
    'http://127.0.0.1:5173/'
  ]);

  // Wait 2 seconds for Chrome to launch and load
  await new Promise(r => setTimeout(r, 2000));

  try {
    const pages = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9222/json', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const targetPage = pages.find(p => p.url && p.url.includes('5173'));
    if (!targetPage) {
      console.log('No page found at 5173, targets:', pages);
      chrome.kill();
      process.exit(1);
    }

    console.log('Target found:', targetPage.title, targetPage.url);
    const ws = new WebSocket(targetPage.webSocketDebuggerUrl);

    let hasException = false;
    let rootHTML = '';

    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
      // Evaluate document title and root HTML
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 3,
          method: 'Runtime.evaluate',
          params: {
            expression: `({
              title: document.title,
              rootText: document.getElementById('root')?.innerText?.slice(0, 300),
              hasSidebar: !!document.querySelector('.studyos-sidebar, aside'),
              hasButtons: document.querySelectorAll('button').length
            })`,
            returnByValue: true
          }
        }));
      }, 1500);
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        hasException = true;
        console.error('❌ EXCEPTION:', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
      } else if (msg.id === 3) {
        console.log('✅ DOM Evaluation Result:', JSON.stringify(msg.result.result.value, null, 2));
      }
    };

    setTimeout(() => {
      chrome.kill();
      if (hasException) {
        console.error('❌ Render test failed with exceptions');
        process.exit(1);
      } else {
        console.log('🎉 SUCCESS: Page rendered with zero exceptions!');
        process.exit(0);
      }
    }, 4500);

  } catch (err) {
    console.error('Test error:', err);
    chrome.kill();
    process.exit(1);
  }
}

testRender();
