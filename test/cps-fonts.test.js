const assert = require('assert');
const fs = require('fs');
const path = require('path');

const sassPath = path.resolve(__dirname, '../app/assets/sass/application.scss');
const cssPath = path.resolve(__dirname, '../public/stylesheets/application.css');
const stylesReadmePath = path.resolve(__dirname, '../app/views/styles/README.md');

const sass = fs.readFileSync(sassPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const stylesReadme = fs.readFileSync(stylesReadmePath, 'utf8');

const expectedFontPath = '/public/fonts/NewTransportCPS/NewTransportCPS-Regular.woff2';
const expectedBoldPath = '/public/fonts/NewTransportCPS/NewTransportCPS-Bold.woff2';

assert.ok(sass.includes(expectedFontPath), 'Expected Sass to use CPS regular font');
assert.ok(sass.includes(expectedBoldPath), 'Expected Sass to use CPS bold font');
assert.ok(css.includes(expectedFontPath), 'Expected compiled CSS to use CPS regular font');
assert.ok(css.includes(expectedBoldPath), 'Expected compiled CSS to use CPS bold font');
assert.ok(stylesReadme.includes('/public/fonts/NewTransportCPS/NewTransportCPS-Regular.woff2'), 'Expected Styles README to link to regular download');
assert.ok(stylesReadme.includes('/public/fonts/NewTransportCPS/NewTransportCPS-Bold.woff2'), 'Expected Styles README to link to bold download');

console.log('PASS CPS fonts are wired into product and linked from styles guidance');
