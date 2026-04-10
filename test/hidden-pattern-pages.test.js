const assert = require('assert');
const fs = require('fs');
const path = require('path');

const navigationPath = path.resolve(__dirname, '../app/views/patterns/navigation.html');
const autoRoutesPath = path.resolve(__dirname, '../app/routes/auto.js');

const navigationTemplate = fs.readFileSync(navigationPath, 'utf8');
const autoRoutes = fs.readFileSync(autoRoutesPath, 'utf8');

const hiddenPaths = [
  '/patterns/check-answers',
  '/patterns/search'
];

for (const hiddenPath of hiddenPaths) {
  assert.ok(
    !navigationTemplate.includes(`href: '${hiddenPath}'`),
    `Expected patterns navigation not to include ${hiddenPath}`
  );

  const routeKey = hiddenPath.replace(/^\//, '');
  assert.ok(
    autoRoutes.includes(`'${routeKey}'`) || autoRoutes.includes(`"${routeKey}"`),
    `Expected auto routes to explicitly hide ${routeKey}`
  );
}

console.log('PASS hidden pattern pages are removed from nav and blocked in routing');
