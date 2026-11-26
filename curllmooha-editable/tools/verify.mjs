// 用本机 Chrome 无头加载「重建工程」与「线上镜像」，抓控制台错误并截图对比。
import { spawn } from 'node:child_process';
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJ = path.resolve(__dirname, '..');
const SHOTS = path.join(PROJ, '..', '_verify_shots');
fs.mkdirSync(SHOTS, { recursive: true });

const CHROME = 'C:\\Users\\17296\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitUp(url, timeout = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          res.resume();
          res.statusCode === 200 ? resolve() : reject(new Error('bad status'));
        });
        req.on('error', reject);
        req.setTimeout(3000, () => req.destroy());
      });
      return true;
    } catch {
      await sleep(500);
    }
  }
  throw new Error(`timeout waiting for ${url}`);
}

const servings = [
  { name: 'rebuild', port: 8899, cmd: 'node', args: [path.join(__dirname, 'serve.js'), path.join(PROJ, 'dist'), '8899'] },
  { name: 'online', port: 8898, cmd: 'node', args: [path.join(__dirname, 'serve.js'), path.resolve(PROJ, '..', 'curllmooha_source'), '8898'] },
];

const procs = [];
for (const s of servings) {
  const p = spawn(s.cmd, s.args, { cwd: PROJ, stdio: 'ignore' });
  procs.push(p);
  await waitUp(`http://127.0.0.1:${s.port}/index.html`);
  console.log(`up: ${s.name} :${s.port}`);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--hide-scrollbars',
    '--mute-audio',
    '--window-size=1440,900',
  ],
});

async function inspect(label, url) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  const errors = [];
  const warns = [];
  const failed = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text().slice(0, 300));
    else if (m.type() === 'warning') warns.push(m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e.message).slice(0, 300)));
  page.on('requestfailed', (r) => failed.push(`${r.url().split('/').pop()} ${r.failure()?.errorText}`));

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // 轮询启动进度：等主场景真正拿到 canvas 尺寸，或 boot 遮罩消失
  let last = null;
  for (let i = 0; i < 30; i++) {
    await sleep(2000);
    last = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      const boot = document.getElementById('boot');
      const pct = document.querySelector('#boot__pct, .boot__pct, #boot__progress');
      return {
        t: Math.round(performance.now() / 1000),
        canvasW: canvas ? canvas.width : 0,
        bootDisplay: boot ? getComputedStyle(boot).display : 'no-boot',
        bootText: (boot?.innerText || '').replace(/\s+/g, ' ').slice(0, 60),
        pct: pct ? pct.textContent : null,
      };
    });
    if (last.canvasW > 1000 || last.bootDisplay === 'none') break;
  }
  console.log(`  ${label}: waited ${last?.t}s canvas=${last?.canvasW} boot=${last?.bootDisplay} :: ${last?.bootText}`);
  await sleep(14000);
  const state = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const boot = document.getElementById('boot');
    return {
      canvas: !!canvas,
      canvasSize: canvas ? `${canvas.width}x${canvas.height}` : null,
      bootDisplay: boot ? getComputedStyle(boot).display : 'no-boot',
      bootOpacity: boot ? getComputedStyle(boot).opacity : null,
      resources: performance.getEntriesByType('resource').length,
      hasHud: !!document.querySelector('#hud, .hud, .fx-nav, nav'),
      title: document.title,
      text: document.body.innerText.replace(/\s+/g, ' ').slice(0, 160),
    };
  });
  const shot = path.join(SHOTS, `${label}.png`);
  await page.screenshot({ path: shot });
  await page.close();
  return { label, url, state, errors, warns, failed, shot };
}

const results = [];
for (const s of servings) {
  results.push(await inspect(s.name, `http://127.0.0.1:${s.port}/`));
}

console.log(JSON.stringify(results.map((r) => ({ ...r, errors: undefined, warns: undefined, failed: undefined })), null, 2));
for (const r of results) {
  const uniq = [...new Set(r.errors.map((e) => e.replace(/\d{4,}/g, 'N').slice(0, 120)))];
  console.log(`\n=== ${r.label} (${r.url}) ===`);
  console.log(`canvas=${r.state.canvas} size=${r.state.canvasSize} boot=${r.state.bootDisplay} resources=${r.state.resources}`);
  console.log(`errors=${r.errors.length} unique=${uniq.length} failedRequests=${r.failed.length}`);
  console.log(uniq.slice(0, 6).map((e) => '  ! ' + e).join('\n'));
}
fs.writeFileSync(path.join(SHOTS, 'result.json'), JSON.stringify(results, null, 2));
await browser.close();
for (const p of procs) p.kill();
