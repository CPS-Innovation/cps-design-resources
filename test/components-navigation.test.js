const assert = require('assert');
const fs = require('fs');
const path = require('path');

const navigationPath = path.resolve(__dirname, '../app/views/components/navigation.html');
const navigationTemplate = fs.readFileSync(navigationPath, 'utf8');

const placeholderLinks = [
  '/components/modal-confirmation-banner'
];

for (const link of placeholderLinks) {
  assert.ok(
    !navigationTemplate.includes(`href: '${link}'`),
    `Expected components navigation not to include placeholder link ${link}`
  );
}

console.log('PASS components navigation hides placeholder links');
