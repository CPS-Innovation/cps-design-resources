const assert = require('assert');
const fs = require('fs');
const path = require('path');

const navigationPath = path.resolve(__dirname, '../app/views/patterns/navigation.html');
const navigationTemplate = fs.readFileSync(navigationPath, 'utf8');

assert.ok(
  !navigationTemplate.includes(`        },
        }
      ]`),
  'Expected patterns navigation template not to contain a stray empty object before the items array closes'
);

console.log('PASS patterns navigation template does not contain the stray closing object');
