const assert = require('assert');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');
const port = 4517;
const password = 'eagle';

function request(method, requestPath, headers = {}, body = '') {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path: requestPath,
      method,
      headers
    }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ res, body: data }));
    });

    req.on('error', reject);

    if (body) {
      req.write(body);
    }

    req.end();
  });
}

async function waitForServer(proc) {
  const deadline = Date.now() + 10000;

  while (Date.now() < deadline) {
    if (proc.exitCode !== null) {
      throw new Error(`Server exited early with code ${proc.exitCode}`);
    }

    try {
      await request('GET', '/login');
      return;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  throw new Error('Timed out waiting for server to start');
}

function startServer() {
  const proc = spawn('node', ['server.js'], {
    cwd: repoDir,
    env: {
      ...process.env,
      PORT: String(port),
      USE_AUTH: 'true',
      PASSWORD: password,
      USE_BROWSER_SYNC: 'false'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  return waitForServer(proc).then(() => proc);
}

function stopServer(proc) {
  return new Promise((resolve) => {
    proc.once('exit', () => resolve());
    proc.kill('SIGTERM');
  });
}

(async () => {
  let server;

  try {
    server = await startServer();

    const deepLinkResponse = await request('GET', '/get-started/onboarding-overview');
    assert.strictEqual(deepLinkResponse.res.statusCode, 302, 'Expected unauthenticated request to redirect to login');

    const sessionCookie = deepLinkResponse.res.headers['set-cookie'][0].split(';')[0];
    const loginBody = `password=${encodeURIComponent(password)}`;
    const loginResponse = await request('POST', '/login', {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(loginBody),
      'Cookie': sessionCookie
    }, loginBody);

    assert.strictEqual(loginResponse.res.statusCode, 302, 'Expected successful login to redirect');

    const cookies = [sessionCookie]
      .concat(loginResponse.res.headers['set-cookie'].map((item) => item.split(';')[0]))
      .join('; ');

    await stopServer(server);
    server = await startServer();

    const afterRestartResponse = await request('GET', '/get-started/onboarding-overview', {
      'Cookie': cookies
    });

    assert.strictEqual(
      afterRestartResponse.res.statusCode,
      200,
      'Expected authenticated cookie to survive a server restart'
    );

    console.log('PASS auth cookie survives restart');
  } catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  } finally {
    if (server) {
      await stopServer(server).catch(() => {});
    }
  }
})();
