const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const notFoundRoute = require('./routes/notFoundRoute');

mongoose
  .connect('mongodb://localhost:27017/moviesdb')
  .catch((err) => console.log(err.message));

app.use(helmet());

// register a new user route
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
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

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
