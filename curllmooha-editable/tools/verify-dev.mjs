// 只做检测：node verify-dev.mjs http://127.0.0.1:8897/
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Users\\17296\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const url = process.argv[2] || 'http://127.0.0.1:8897/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--mute-audio'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 220)));
page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message).slice(0, 220)));
page.on('response', (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
let canvas = 0;
for (let i = 0; i < 25; i++) {
  await sleep(2000);
  canvas = await page.evaluate(() => document.querySelector('canvas')?.width || 0);
  if (canvas > 1000) break;
}
const state = await page.evaluate(() => ({
  boot: (document.getElementById('boot')?.innerText || '').replace(/\s+/g, ' ').slice(0, 60),
  h1: document.querySelector('h1')?.innerText.replace(/\s+/g, ' ').slice(0, 60),
}));
console.log(`dev url=${url} canvas=${canvas} errors=${errors.length} boot="${state.boot}" h1="${state.h1}"`);
if (errors.length) console.log([...new Set(errors)].slice(0, 6).join('\n'));

await browser.close();
