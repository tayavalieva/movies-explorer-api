const notFoundRouter = require('express').Router();
const NotFoundError = require('../errors/not-found');

notFoundRouter.use('*', () => { throw new NotFoundError('Страница не найдена'); });

module.exports = notFoundRouter;
