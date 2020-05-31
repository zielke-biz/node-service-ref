import express from 'express';
import compression from 'compression'; // compresses requests
import session, {MemoryStore} from 'express-session';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import flash from 'express-flash';
import path from 'path';
import passport from 'passport';
import cors from 'cors';

// Controllers (route handlers)
import * as apiController from './controllers/api';

// Create Express server
const app = express();

// Express configuration
const SESSION_SECRET = 'my_secret';
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MemoryStore(),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(
    express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}),

);

/**
 * Primary app routes.
 */
app.get('/', apiController.getApi);
app.get('/api', apiController.getApi);
app.get('/api/demo', apiController.getDemo);


export default app;
