import { spawn } from 'node:child_process';
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJ = path.resolve(__dirname, '..');
const SHOTS = path.join(PROJ, '..', '_verify_shots');
const CHROME = 'C:\\Users\\17296\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const srv = spawn('node', [path.join(__dirname, 'serve.js'), path.join(PROJ, 'dist'), '8899'], { stdio: 'ignore' });
for (let i = 0; i < 40; i++) {
  try {
    await new Promise((res, rej) => {
      const r = http.get('http://127.0.0.1:8899/hire/', (x) => { x.resume(); res(); });
      r.on('error', rej);
    });
    break;
  } catch { await sleep(300); }
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--mute-audio'],
});

const checks = [
  ['/', 12000],
  ['/hire/', 5000],
  ['/work/polify/', 5000],
  ['/work/hologram/', 5000],
];

const results = [];
for (const [url, wait] of checks) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  const missing = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 200)));
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 200)));
  page.on('response', (r) => {
    if (r.status() >= 400) missing.push(`${r.status()} ${r.url().replace('http://127.0.0.1:8899', '')}`);
  });
  await page.goto('http://127.0.0.1:8899' + url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await sleep(wait);
  const info = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.innerText.replace(/\s+/g, ' ').slice(0, 90) || null,
    links: document.querySelectorAll('a.fx-btn, a.fx-link').length,
    images: [...document.images].filter((i) => i.naturalWidth > 0).length + '/' + document.images.length,
    canvas: (() => { const c = document.querySelector('canvas'); return c ? c.width + 'x' + c.height : null; })(),
    bg: getComputedStyle(document.body).backgroundColor,
  }));
  const shot = path.join(SHOTS, `page-${url.replace(/[^a-z0-9]+/g, '_')}.png`);
  await page.screenshot({ path: shot });
  results.push({ url, ...info, errors: [...new Set(errors)].slice(0, 4), missing: [...new Set(missing)] });
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
fs.writeFileSync(path.join(SHOTS, 'pages.json'), JSON.stringify(results, null, 2));
await browser.close();
srv.kill();

