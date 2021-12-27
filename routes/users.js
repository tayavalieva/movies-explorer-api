const usersRouter = require('express').Router();
const { getCurrentUser, updateProfile, signOut } = require('../controllers/users');
const { userProfileUpdateValidator } = require('../middlewares/req-validator');

// gets current user info: name and email
usersRouter.get('/users/me', getCurrentUser);

// updates user profile info: name and email
usersRouter.patch(
  '/users/me',
  userProfileUpdateValidator,
  updateProfile,
);

// sign out
usersRouter.delete('/signout', signOut);

module.exports = usersRouter;
