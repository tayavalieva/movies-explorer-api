const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const notFoundRoute = require('./notFoundRoute');

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

// public routes

// register a new user route
router.post(
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
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

// auth middleware
router.use(auth);

// private routes
router.use(usersRouter);
router.use(moviesRouter);
router.use('*', notFoundRoute);

module.exports = router;
