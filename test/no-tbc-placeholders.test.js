const assert = require('assert');
const fs = require('fs');
const path = require('path');

const roots = [
  path.resolve(__dirname, '../app/views/components'),
  path.resolve(__dirname, '../app/views/patterns'),
  path.resolve(__dirname, '../app/views/styles')
];

const placeholderPattern = /\bt\.b\.c\b|\bT\.B\.C\b|\bTBC\b/i;
const offenders = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!/\.(md|html|njk)$/i.test(entry.name)) {
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    if (placeholderPattern.test(content)) {
      offenders.push(path.relative(path.resolve(__dirname, '..'), fullPath));
    }
  }
}

for (const root of roots) {
  walk(root);
}

assert.deepStrictEqual(
  offenders,
  [],
  `Expected no visible TBC placeholders in published views, found: ${offenders.join(', ')}`
);

console.log('PASS published views do not contain TBC placeholders');
