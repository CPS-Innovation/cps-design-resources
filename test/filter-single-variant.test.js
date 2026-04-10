const assert = require('assert');
const fs = require('fs');
const path = require('path');

const readmePath = path.resolve(__dirname, '../app/views/components/filter/README.md');
const readme = fs.readFileSync(readmePath, 'utf8');

assert.ok(!readme.includes('### Version 2'), 'Expected filter README not to include Version 2');
assert.ok(!readme.includes('filter-1.png'), 'Expected filter README not to include version 2 image');
assert.ok(!readme.includes('(v2)'), 'Expected filter README not to mention v2 usage');
assert.ok(readme.includes('This component is used in:'), 'Expected filter README to keep usage section');

console.log('PASS filter README documents a single variant');
