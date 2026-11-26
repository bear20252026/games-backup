// Prefix root-absolute URLs in a Vite build so it can run from a GitHub Pages
// project path such as /games-backup/.
//
// Usage: node tools/normalize-pages-paths.mjs <build-dir> /games-backup/
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '_site');
const base = (process.argv[3] || '/games-backup/').replace(/\/?$/, '/');

const textExt = new Set([
  '.html',
  '.js',
  '.css',
  '.json',
  '.webmanifest',
  '.svg',
  '.xml',
  '.txt',
]);

const segments = ['assets', 'cursors', 'draco', 'work', 'hire'];
const files = [
  'apple-touch-icon.png',
  'bebas-neue-v9-latin-regular.woff',
  'favicon.ico',
  'favicon.svg',
  'lilita-one-uppercase.typeface.json',
  'og-image.jpg',
  'site.webmanifest',
  'third-party-licenses.txt',
  'vipin-pathak-resume.pdf',
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

let changed = 0;

for (const file of walk(root)) {
  if (!textExt.has(path.extname(file).toLowerCase())) continue;

  const before = fs.readFileSync(file, 'utf8');
  let text = before;

  // Prefix path segments when they begin a URL (start of string, after
  // whitespace, a quote, a parenthesis, '=', a comma, or an HTML tag bracket).
  // The delimiter guard leaves absolute URLs on other hosts untouched.
  for (const segment of segments) {
    const re = new RegExp(`(^|[\\s"'\`(=,<>])/${segment}/`, 'g');
    text = text.replace(re, `$1${base}${segment}/`);
  }

  // Root-level files referenced by HTML, CSS or the web manifest.
  for (const name of files) {
    const escaped = name.replaceAll('.', '\\.');
    const re = new RegExp(`(^|[\\s"'\`(=,<>])/${escaped}(?=["'\`)?<>\\s])`, 'g');
    text = text.replace(re, `$1${base}${name}`);
  }

  // Root links, fragment-only links back to the home page, and manifest roots.
  text = text.replaceAll('"start_url": "/"', `"start_url": "${base}"`);
  text = text.replaceAll('"scope": "/"', `"scope": "${base}"`);
  text = text.replaceAll('href="/"', `href="${base}"`);
  text = text.replaceAll("href='/'", `href='${base}'`);
  text = text.replaceAll('href="/#', `href="${base}#`);
  text = text.replaceAll("href='/#", `href='${base}#`);
  text = text.replaceAll('url("/")', `url("${base}")`);
  text = text.replaceAll("url('/')", `url('${base}')`);

  if (text !== before) {
    fs.writeFileSync(file, text);
    changed += 1;
  }
}

console.log(`normalised ${changed} file(s) under ${root} for ${base}`);
