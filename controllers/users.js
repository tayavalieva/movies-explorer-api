const User = require('../models/user');
const NotFoundError = require('../errors/not-found');

module.exports.getCurrentUser = (req, res, next) => {
  const userID = req.user._id;
  User.findById(userID)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным ID не найден.');
      }
      return res.status(200).send({ data: user });
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
      return res.status(200).send({ data: user });
    })
    .catch(next);
};
