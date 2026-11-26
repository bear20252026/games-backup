// 从 three 的打包产物里恢复「压缩内部名 → 官方类名」的映射。
// 依据：three 每个类在构造函数里都打 isXxx 标记（this.isVector3 / X.prototype.isVector3），
// 以及 this.type = "BufferGeometry" 这样的类型字符串。用括号配对定位类体，避免 AST 全量遍历。
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.argv[2];
const OUT = process.argv[3];
const code = fs.readFileSync(SRC, 'utf8');

const classRe = /\bclass\s+([A-Za-z_$][\w$]*)/g;
const classMap = new Map();
const classes = [];
let m;

function bodyRange(start) {
  // start 指向 class 关键字后的第一个 '{'
  let i = code.indexOf('{', start);
  if (i < 0) return null;
  let depth = 0;
  for (let j = i; j < code.length; j++) {
    const c = code[j];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return [i, j];
    }
  }
  return null;
}

while ((m = classRe.exec(code))) {
  const name = m[1];
  const range = bodyRange(m.index);
  if (!range) continue;
  const body = code.slice(range[0], range[1] + 1).slice(0, 6000); // 构造函数在类体开头
  const markers = [];
  const markerRe = new RegExp(
    `(?:${name.replace(/\$/g, '\\$')}\\.prototype|this)\\.is([A-Z][A-Za-z0-9]*)\\s*=\\s*(?:!0|true)`,
    'g',
  );
  let mm;
  while ((mm = markerRe.exec(body))) markers.push(mm[1]);
  const typeM = body.match(/this\.type\s*=\s*"([A-Z][A-Za-z0-9]*)"/);
  const official = markers[0] || (typeM ? typeM[1] : null);
  if (official && /^[A-Z][A-Za-z0-9]*$/.test(official)) {
    classMap.set(name, official);
    classes.push({ internal: name, official, markers, typeString: typeM ? typeM[1] : null });
  }
}

// export{internal as alias,...}
const exportAliases = new Map();
const expM = code.match(/export\s*\{([^}]*)\}/);
if (expM) {
  for (const part of expM[1].split(',')) {
    const pm = part.trim().match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
    if (pm) exportAliases.set(pm[2], pm[1]);
  }
}

const aliasToOfficial = {};
const unmapped = [];
for (const [alias, internal] of exportAliases) {
  const official = classMap.get(internal);
  if (official) aliasToOfficial[alias] = official;
  else unmapped.push({ alias, internal });
}

const result = {
  generatedFrom: path.basename(SRC),
  classesFound: classMap.size,
  exportsFound: exportAliases.size,
  mapped: Object.keys(aliasToOfficial).length,
  aliasToOfficial,
  unmapped,
  classes,
};
fs.writeFileSync(OUT, JSON.stringify(result, null, 2));

console.log(`class markers found : ${classMap.size}`);
console.log(`three exports       : ${exportAliases.size}`);
console.log(`alias -> official   : ${result.mapped}`);
console.log('\nsample mapping:');
Object.entries(aliasToOfficial).slice(0, 25).forEach(([a, o]) => console.log(`  ${a} -> ${o}`));
console.log('\nunmapped sample:');
unmapped.slice(0, 25).forEach((u) => console.log(`  ${u.alias} (${u.internal})`));
