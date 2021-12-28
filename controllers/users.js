const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../configs/config');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');
const BadRequest = require('../errors/bad-request');
const UnauthorizedError = require('../errors/unauthorized');

// Register new user
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => User.create({
    email: req.body.email,
    password: hash,
    name: req.body.name,
  }))
    .then((user) => res.status(201).send({ data: [user.name, user.email] }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Такой пользователь уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Неверные данные для регистрации'));
      }
      return next(err);
    });
};

// Login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      }).send({ message: 'Sucessfully logged in' })
        .end();
    }).catch(() => {
      throw new UnauthorizedError('Неверный логин или пароль');
    }).catch(next);
};

// Sign out
module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Signed out' });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userID = req.user._id;
  User.findById(userID)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным ID не найден.');
      }
      return res.send({ data: [user.name, user.email] });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const userID = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    userID,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным ID не найден.');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с указанным email уже существует'));
      }
      return next(err);
    });
};
