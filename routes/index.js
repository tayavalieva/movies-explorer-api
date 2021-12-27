const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const notFoundRoute = require('./notFoundRoute');

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const { newUserValidator, loginValidator } = require('../middlewares/req-validator');

// public routes
// register a new user route
router.post(
  '/signup',
  newUserValidator,
  createUser,
);

// sign in route
router.post(
  '/signin',
  loginValidator,
  login,
);

// auth middleware
router.use(auth);

// private routes
router.use(usersRouter);
router.use(moviesRouter);
router.use('*', notFoundRoute);

module.exports = router;
