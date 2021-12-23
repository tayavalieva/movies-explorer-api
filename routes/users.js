const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, updateProfile } = require('../controllers/users');

// gets current user info: name and email
usersRouter.get('/users/me', getCurrentUser);

// updates user profile info: name and email
usersRouter.patch(
  'users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required(),
    }),
  }),

  updateProfile,
);
