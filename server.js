// Core dependencies
const fs = require('fs');
const path = require('path');

// NPM dependencies
const browserSync = require('browser-sync');
const express = require('express');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const markdown = require('nunjucks-markdown');
const session = require('express-session');
const bodyParser = require('body-parser');
const marked = require('marked');
const fileHelper = require('./app/utils/file-helper');
const hljs = require('highlight.js');

// Run before other code to make sure variables from .env are available
dotenv.config();

// Routing
const routes = require('./app/routes/index');
const multiFileUploadRoutes = require('./app/routes/multi-file-upload');
const autoRoutes = require('./app/routes/auto');

// Local dependencies
const utils = require('./lib/utils.js');

// Port
const port = process.env.PORT || 4000;

// Configuration
const env = process.env.NODE_ENV || 'development';
const useAuth = process.env.USE_AUTH === 'true';
const useHttps = process.env.USE_HTTPS === 'true';
// const username = process.env.USERNAME || "design  ";
const password = process.env.PASSWORD || "eagle";
const useBrowserSync = process.env.USE_BROWSER_SYNC === 'true';

// Application
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'moj-frontend-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set `true` if using HTTPS
}));

// Authentication Middleware
function authMiddleware(req, res, next) {
  if (!useAuth) return next(); // Skip authentication if disabled
  if (req.session.authenticated) return next(); // Allow access if logged in
  res.redirect('/login'); // Redirect to login page
}

// Login Page Route
app.get('/login', (req, res) => {
  res.send(`
    <link href="/public/stylesheets/application.css" rel="stylesheet">

    .govuk-heading-l {
    color: rgb(11, 12, 12);
    font-family: NewTransport, arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 700;
           font-size: 2.25rem;
        line-height: 1.11111;
    display: block;
    margin-top: 0px;
    margin-bottom: 30px;
}

    .govuk-label--s {
      font-family: NewTransport, arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 700;
        font-size: 1.1875rem;
        line-height: 1.31579;
    }

    .govuk-label {
    font-family: NewTransport, arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
    color: rgb(11, 12, 12);
    display: block;
    margin-bottom: 5px; }

        .govuk-\!-width-one-quarter {
        width: 25% !important;
    }


    .govuk-input {
    font-family: NewTransport, arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
      font-size: 1.1875rem;
        line-height: 1.31579;
    box-sizing: border-box;
    width: 100%;
    height: 2.5rem;
    margin-top: 0px;
    appearance: none;
    padding: 5px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(11, 12, 12);
    border-image: initial;
    border-radius: 0px;


.govuk-button {
    font-family: NewTransport, arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    font-size: 1.1875rem;
        line-height: 1;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    width: 100%;
    margin-top: 0px;
    margin-right: 0px;
    margin-left: 0px;
            margin-bottom: 32px;
    color: rgb(255, 255, 255);
    background-color: rgb(0, 112, 60);
    box-shadow: rgb(0, 45, 24) 0px 2px 0px;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
    appearance: none;
    padding: 8px 10px 7px;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    border-radius: 0px;
}




    </style>
    <div style="margin: 20px 20px">
    <h1 class="govuk-heading-l">CPS Design Manual</h1>
    <form method="post" action="/login">
      <!-- <input type="text" name="username" placeholder="Username" required>
       <input type="password" name="password" placeholder="Password" required>
       <button type="submit">Login</button> -->
    <div class="govuk-form-group">
      <h1 class="govuk-label-wrapper" style="">
    <label class="govuk-label govuk-label--s" for="event-name">
      Enter password
    </label>
  </h1>
  <input class="govuk-input govuk-!-width-one-quarter" id="password" type="password" name="password" type="text" required>
  </div>
  <div>
  <button type="submit" class="govuk-button" data-module="govuk-button">
  Continue
</button>
</div>
    </form>
    </div>
  `);
});

// Handle Login Submission
app.post('/login', (req, res) => {
  // if (req.body.username === username && req.body.password === password) {
    if (req.body.password === password) {
    req.session.authenticated = true;
    return res.redirect('/'); // Redirect to home after login
  }
  res.status(401).send("Unauthorized: Invalid credentials");
});

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Apply Authentication Middleware Globally (Only if Auth is Enabled)
if (useAuth) {
  app.use(authMiddleware);
}

// Find a free port and start the server
utils.findAvailablePort(app, (port) => {
  console.log(`Listening on port ${port} - URL: http://localhost:${port} (${env})`);
  if ((env === 'production' || env === 'staging') || !useBrowserSync) {
    app.listen(port);
  } else {
    app.listen(port - 50, () => {
      browserSync({
        proxy: `localhost:${port - 50}`,
        port: port,
        ui: false,
        files: ['public/**/*.*', 'app/views/**/*.*'],
        ghostmode: false,
        open: false,
        notify: false,
        logLevel: 'error'
      });
    });
  }
});

// Force HTTPS on production
if ((env === 'production' || env === 'staging') && useHttps) {
  app.use(utils.forceHttps);
  app.set('trust proxy', 1);
}

// Search engine indexing
if ((env === 'production' || env === 'staging') && !useAuth) {
  // Allow search engines to index the site
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nAllow: /');
  });
} else {
  // Prevent search indexing
  app.use((req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex');
    next();
  });

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
  });
}

// Setup application
const appViews = [
  path.join(__dirname, '/node_modules/govuk-frontend/'),
  path.join(__dirname, '/node_modules/@ministryofjustice/frontend/'),
  path.join(__dirname, 'app/views'),
  path.join(__dirname, 'app/components')
];

// Configurations
const nunjucksEnvironment = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
});

nunjucksEnvironment.addGlobal('getNunjucksCode', fileHelper.getNunjucksCode);
nunjucksEnvironment.addGlobal('getHtmlCode', fileHelper.getHTMLCode);
nunjucksEnvironment.addGlobal('getCssCode', fileHelper.getCSSCode);
nunjucksEnvironment.addGlobal('getJsCode', fileHelper.getJSCode);

nunjucksEnvironment.addFilter('highlight', (code, language = '') => {
  const highlighted = hljs.highlight(code, { language }).value;
  return new nunjucks.runtime.SafeString(highlighted);
});

// Add filters from MOJ Frontend
let mojFilters = require('./node_modules/@ministryofjustice/frontend/moj/filters/all')();
mojFilters = Object.assign(mojFilters);
Object.keys(mojFilters).forEach(function (filterName) {
  nunjucksEnvironment.addFilter(filterName, mojFilters[filterName]);
});

// Set view engine
app.set('view engine', 'html');

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/@ministryofjustice/frontend/moj/assets')));

app.use('/node_modules/govuk-frontend', express.static(path.join(__dirname, '/node_modules/govuk-frontend')));
app.use('/node_modules/moj-frontend', express.static(path.join(__dirname, '/node_modules/@ministryofjustice/frontend')));

// Use routes
app.use(routes);
app.use(multiFileUploadRoutes);
app.use(autoRoutes);

const renderer = new marked.Renderer();

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pendantic: true,
  sanitize: false,
  smartLists: true,
  smartypants: true
});

// Markdown register
markdown.register(nunjucksEnvironment, marked);

const nodeModulesExists = fs.existsSync(path.join(__dirname, '/node_modules'));
if (!nodeModulesExists) {
  console.error('ERROR: Node module folder missing. Try running `npm install`');
  process.exit(0);
}

// Create template .env file if it doesn't exist
const envExists = fs.existsSync(path.join(__dirname, '/.env'));
if (!envExists) {
  fs.createReadStream(path.join(__dirname, '/lib/template.env'))
    .pipe(fs.createWriteStream(path.join(__dirname, '/.env')));
}

// Start server
const PORT = 4000;
const HOST = '0.0.0.0'; // Bind to all interfaces

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

module.exports = app;