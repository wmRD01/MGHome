'use strict';

// No npm packages are required. Keep this file beside the launcher assets.
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs/promises');
const { createReadStream } = require('node:fs');
const { spawn } = require('node:child_process');
const { createHash, randomUUID } = require('node:crypto');

const HOST = '127.0.0.1';
const SERVICE = 'cocos-play-launcher';
const SERVICE_VERSION = 2;
const LAUNCHER_FILES = new Set(['index.html', 'style.css', 'launcher.js', 'game-art.js', 'm1-cover.png']);
const KNOWN_GAMES = [
  ['M1', 'M1_RockPaperScissorsTempleAdventure', '猜拳神廟冒險', 'Rock Paper Scissors · Temple Adventure'],
  ['M2', 'M2_AsteroidRiches', '星隕財富', 'Asteroid Riches'],
  ['M3', 'M3_SausageDuel', '香腸對決', 'Sausage Duel'],
  ['M4', 'M4_CyberHi-LoBattle', '賽博高低對決', 'Cyber Hi-Lo Battle'],
  ['M5', 'M5_PhoenixOfFiveElementalOrbs', '五行鳳凰', 'Phoenix of Five Elemental Orbs'],
  ['M6', 'M6_NeonCoinFlip', '霓虹擲幣', 'Neon Coin Flip'],
  ['M7', 'M7_MysteryBallsCircus', '神秘球馬戲團', 'Mystery Balls Circus'],
  ['M8', 'M8_Treasure Quest', '寶藏探險', 'Treasure Quest'],
  ['M9', 'M9_BananaPullTabs', '香蕉拉霸', 'Banana Pull Tabs'],
  ['M10', 'M10_TowerOfDiceMaster', '骰塔大師', 'Tower of Dice Master'],
  ['AI', 'AIBaccaratTableGame', 'AI 百家樂', 'AI Baccarat Table Game'],
  ['SI8', 'Si8_CrashMarket', '崩盤市場', 'Crash Market'],
  ['TEST', 'Test', '測試場', 'Test Build'],
];
const KNOWN_BY_FOLDER = new Map(KNOWN_GAMES.map(([id, folder, name, subtitle], order) => [folder.toLowerCase(), { id, name, subtitle, order }]));
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.m4a': 'audio/mp4',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.plist': 'application/xml; charset=utf-8',
};

function parseOptions(args) {
  const options = { root: __dirname, port: 8090, open: false, exportGames: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--open') {
      options.open = true;
    } else if (argument === '--export-games') {
      options.exportGames = true;
    } else if (argument === '--root') {
      if (!args[index + 1] || args[index + 1].startsWith('--')) {
        throw new Error('--root requires a directory.');
      }
      options.root = path.resolve(args[++index]);
    } else if (argument === '--port') {
      const value = args[++index];
      if (!value || !/^\d+$/.test(value)) throw new Error('--port requires an integer.');
      options.port = Number(value);
      if (options.port < 1 || options.port > 65535) {
        throw new Error('--port must be between 1 and 65535.');
      }
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return options;
}

function isInside(base, candidate) {
  const relative = path.relative(base, candidate);
  return relative === '' || (!path.isAbsolute(relative) && relative !== '..' && !relative.startsWith(`..${path.sep}`));
}

function send(req, res, status, body, contentType = 'text/plain; charset=utf-8', extraHeaders = {}) {
  const bytes = Buffer.from(body);
  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': bytes.length,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  });
  res.end(req.method === 'HEAD' ? undefined : bytes);
}

function sendJson(req, res, body) {
  send(req, res, 200, JSON.stringify(body), 'application/json; charset=utf-8');
}

// Inspect the raw request path before URL normalization can remove dot segments.
function requestPath(rawUrl) {
  if (!rawUrl || !rawUrl.startsWith('/')) throw new Error('Invalid URL.');
  const pathname = decodeURIComponent(rawUrl.split(/[?#]/, 1)[0]);
  if (/[\\\x00-\x1f\x7f]/.test(pathname)) throw new Error('Invalid path.');
  const segments = pathname.split('/');
  if (segments.some(segment => segment === '.' || segment === '..' || /[:]/.test(segment) || /[. ]$/.test(segment))) {
    throw new Error('Invalid path.');
  }
  return pathname;
}

async function existingFile(base, relativePath) {
  const candidate = path.resolve(base, relativePath);
  if (!isInside(base, candidate)) return null;
  try {
    const resolved = await fs.realpath(candidate);
    if (!isInside(base, resolved)) return null;
    const stat = await fs.stat(resolved);
    return stat.isFile() ? { resolved, stat } : null;
  } catch (error) {
    if (['ENOENT', 'ENOTDIR', 'EACCES', 'EPERM', 'ELOOP'].includes(error.code)) return null;
    throw error;
  }
}

async function gameRoot(buildRoot, folder) {
  try {
    const expected = path.join(buildRoot, folder, 'web-mobile');
    const resolved = await fs.realpath(expected);
    // Neither a game directory nor web-mobile may redirect to another folder.
    return path.relative(expected, resolved) === '' && (await fs.stat(resolved)).isDirectory() ? resolved : null;
  } catch (error) {
    if (['ENOENT', 'ENOTDIR', 'EACCES', 'EPERM', 'ELOOP'].includes(error.code)) return null;
    throw error;
  }
}

async function scanGames(buildRoot, { relativeUrls = false } = {}) {
  const entries = await fs.readdir(buildRoot, { withFileTypes: true });
  const folders = entries.filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
  const usedIds = new Set(KNOWN_GAMES.map(([id]) => id));
  const games = [];
  for (const folder of folders) {
    const root = await gameRoot(buildRoot, folder);
    if (!root) continue;
    const known = KNOWN_BY_FOLDER.get(folder.toLowerCase());
    let id = known && known.id;
    if (!id) {
      const slug = folder.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'game';
      const digest = createHash('sha256').update(folder).digest('hex');
      const baseId = `CUSTOM-${slug}-${digest.slice(0, 12)}`;
      id = baseId;
      for (let suffix = 2; usedIds.has(id); suffix += 1) id = `${baseId}-${suffix}`;
      usedIds.add(id);
    }
    games.push({
      id,
      name: known ? known.name : folder,
      subtitle: known ? known.subtitle : folder,
      folder,
      url: `${relativeUrls ? '.' : ''}/${encodeURIComponent(folder)}/web-mobile/index.html`,
      available: Boolean(await existingFile(root, 'index.html')),
      order: known ? known.order : KNOWN_GAMES.length,
    });
  }
  games.sort((left, right) => left.order - right.order || left.folder.localeCompare(right.folder, 'en'));
  return games.map(({ order, ...game }) => game);
}

function createHandler(buildRoot, launcherRoot) {
  const compatibilityCache = new Map();
  return async (req, res) => {
    try {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        send(req, res, 405, 'Method not allowed.', undefined, { Allow: 'GET, HEAD' });
        return;
      }
      let pathname;
      try {
        pathname = requestPath(req.url);
      } catch {
        send(req, res, 400, 'Invalid request path.');
        return;
      }
      if (pathname === '/api/health') {
        sendJson(req, res, { service: SERVICE, version: SERVICE_VERSION, root: buildRoot });
        return;
      }
      if (pathname === '/api/games' || pathname === '/games.json') {
        const games = await scanGames(buildRoot, { relativeUrls: pathname === '/games.json' });
        sendJson(req, res, { games });
        return;
      }

      let file = null;
      let gameAsset = null;
      const launcherFile = pathname === '/' ? 'index.html' : pathname.slice(1);
      if (LAUNCHER_FILES.has(launcherFile)) {
        file = await existingFile(launcherRoot, launcherFile);
      } else {
        const gameRoute = pathname.match(/^\/([^/]+)\/web-mobile\/(.+)$/);
        if (gameRoute) {
          const root = await gameRoot(buildRoot, gameRoute[1]);
          gameAsset = gameRoute[2];
          if (root) file = await existingFile(root, gameAsset);
        }
      }
      if (!file) {
        send(req, res, 404, 'Not found.');
        return;
      }

      const extension = path.extname(file.resolved).toLowerCase();
      let compatibility = null;
      if (gameAsset && /^assets\/main\/index[^/]*\.js$/.test(gameAsset)) {
        compatibility = compatibilityCache.get(file.resolved);
        if (!compatibility || compatibility.mtimeMs !== file.stat.mtimeMs || compatibility.size !== file.stat.size) {
          const original = await fs.readFile(file.resolved);
          let replacements = 0;
          // Cocos' exponent lowering produces Math.pow(BigInt, BigInt), which
          // throws during BasicLimit initialization. Restore only these calls
          // in game main bundles; leave the exported build files untouched.
          const repaired = original.toString('utf8').replace(/\bMath\.pow\((\d+n),\s*(\d+n|BigInt\([^()]*\))\)/g, (_, base, exponent) => {
            replacements += 1;
            return `(${base} ** ${exponent})`;
          });
          compatibility = {
            mtimeMs: file.stat.mtimeMs,
            size: file.stat.size,
            bytes: replacements ? Buffer.from(repaired, 'utf8') : original,
            replacements,
          };
          compatibilityCache.set(file.resolved, compatibility);
        }
      }
      res.writeHead(200, {
        'Content-Type': MIME[extension] || 'application/octet-stream',
        'Content-Length': compatibility ? compatibility.bytes.length : file.stat.size,
        'Cache-Control': extension === '.html' ? 'no-store' : 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        ...(compatibility && compatibility.replacements ? { 'X-Cocos-Compatibility': 'bigint-exponent' } : {}),
      });
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      if (compatibility) {
        res.end(compatibility.bytes);
        return;
      }
      const stream = createReadStream(file.resolved);
      stream.on('error', () => res.destroy());
      res.on('close', () => stream.destroy());
      stream.pipe(res);
    } catch (error) {
      console.error('[Launcher] Request failed:', error.message);
      if (!res.headersSent) send(req, res, 500, 'Internal server error.');
      else res.destroy();
    }
  };
}

function openBrowser(url) {
  let command;
  let args;
  if (process.platform === 'win32') {
    command = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'rundll32.exe');
    args = ['url.dll,FileProtocolHandler', url];
  } else if (process.platform === 'darwin') {
    command = 'open';
    args = [url];
  } else {
    command = 'xdg-open';
    args = [url];
  }
  const child = spawn(command, args, { detached: true, stdio: 'ignore', shell: false, windowsHide: true });
  child.on('error', error => console.warn(`[Launcher] Open ${url} in your browser (${error.message}).`));
  child.unref();
}

async function listen(server, port) {
  return new Promise((resolve, reject) => {
    const onError = error => {
      server.off('listening', onListening);
      reject(error);
    };
    const onListening = () => {
      server.off('error', onError);
      resolve();
    };
    server.once('error', onError);
    server.once('listening', onListening);
    server.listen(port, HOST);
  });
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const buildRoot = await fs.realpath(path.resolve(options.root));
  if (!(await fs.stat(buildRoot)).isDirectory()) throw new Error('--root must be a directory.');
  const launcherRoot = await fs.realpath(__dirname);
  if (options.exportGames) {
    const games = await scanGames(buildRoot, { relativeUrls: true });
    const manifestPath = path.join(launcherRoot, 'games.json');
    const pending = path.join(launcherRoot, `.games-${randomUUID()}.json`);
    try {
      await fs.writeFile(pending, JSON.stringify({ games }, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' });
      await fs.rename(pending, manifestPath);
    } finally {
      await fs.rm(pending, { force: true });
    }
    console.log(`[Launcher] Exported ${games.length} games to ${manifestPath}`);
    return;
  }
  const server = http.createServer(createHandler(buildRoot, launcherRoot));
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  try {
    await listen(server, options.port);
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      throw new Error(`Port ${options.port} is already in use. Choose another --port, or close the service using that port.`);
    }
    throw error;
  }
  const url = `http://${HOST}:${options.port}/`;
  console.log(`[Launcher] Ready: ${url}`);
  console.log(`[Launcher] Game folder: ${buildRoot}`);
  console.log('[Launcher] Keep this window open. Close it or press Ctrl+C to stop.');
  if (options.open) openBrowser(url);

  let stopping = false;
  const stop = () => {
    if (stopping) return;
    stopping = true;
    console.log('\n[Launcher] Stopping...');
    server.close(() => process.exit(0));
    server.closeAllConnections();
  };
  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);
  server.on('error', error => {
    console.error(`[Launcher] Server error: ${error.message}`);
    stop();
  });
}

main().catch(error => {
  console.error(`[Launcher] ${error.message}`);
  process.exitCode = 1;
});
