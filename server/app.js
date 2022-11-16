require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const FileStore = require('session-file-store')(session);

const authRouter = require('./src/routes/auth.router');
const lkRouter = require('./src/routes/lk.router');

const app = express();

const { PORT, COOKIE_SECRET, COOKIE_NAME, CORS_ORIGIN} = process.env;

// SERVER'S SETTINGS
app.set('cookieName', COOKIE_NAME);

// APP'S MIDDLEWARES
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    name: app.get('cookieName'),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
    },
  }),
);

// APP'S ROUTES
app.use('/auth', authRouter);
app.use('/lk', lkRouter);

app.listen(PORT, () => {
  console.log('Сервер запущен на порте', PORT);
});
