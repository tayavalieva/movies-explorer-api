require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000, MONGODB_URI = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const notFoundRoute = require('./routes/notFoundRoute');

mongoose.connect(MONGODB_URI).catch((err) => console.log(err.message));

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://movie-explorer.nomoredomains.rocks',
    'https://movie-explorer.nomoredomains.rocks',
  ],
  credentials: true,
};

app.use(requestLogger);
app.use(cors(corsOptions));
app.use(helmet());

// register a new user route
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

// sign in route
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.use(auth);

app.use('/', usersRoutes);
app.use('/', moviesRoutes);
app.use('*', notFoundRoute);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
