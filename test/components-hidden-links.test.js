const assert = require('assert');
const fs = require('fs');
const path = require('path');

const navigationPath = path.resolve(__dirname, '../app/views/components/navigation.html');
const navigationTemplate = fs.readFileSync(navigationPath, 'utf8');

assert.ok(
  !navigationTemplate.includes("href: '/components/hover-text'"),
  'Expected components navigation not to include /components/hover-text'
);

console.log('PASS components navigation hides hover text link');
