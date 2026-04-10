const assert = require('assert');
const fs = require('fs');
const path = require('path');

const navigationPath = path.resolve(__dirname, '../app/views/patterns/navigation.html');
const navigationTemplate = fs.readFileSync(navigationPath, 'utf8');

const placeholderLinks = [
  '/patterns/actions-footer',
  '/patterns/button-position',
  '/patterns/calendar',
  '/patterns/document-tabs',
  '/patterns/long-forms',
  '/patterns/redaction-log',
  '/patterns/URN-links'
];

for (const link of placeholderLinks) {
  assert.ok(
    !navigationTemplate.includes(`href: '${link}'`),
    `Expected patterns navigation not to include placeholder link ${link}`
  );
}

console.log('PASS patterns navigation hides placeholder links');
