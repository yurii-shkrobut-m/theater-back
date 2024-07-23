const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('./config/passport');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth');
const actorRoutes = require('./routes/actor.routes');
const performanceRoutes = require('./routes/performace.routes');
const usersRouter = require('./routes/users');

require('dotenv').config()
const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Theater API',
      version: '1.0.0',
      description: 'API документація для Theater Back',
    },
    servers: [
      {
        url: process.env.SERVER_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // шляхи до файлів з роутами та моделями
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.get('/', function (req, res) {
  res.send('Hello World!'); // This will serve your request to '/'.
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  console.log(req.headers)
  if (req.path.startsWith('/auth') || req.path.startsWith('/public')) {
    return next();
  }
  passport.authenticate('jwt', { session: false })(req, res, next);
});
app.use('/api/auth', authRoutes);
app.use('/api/actors', actorRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/users', usersRouter);


mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
