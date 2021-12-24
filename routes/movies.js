const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getSavedMovies, addSavedMovie, deleteSavedMovie } = require('../controllers/movies');

const { method } = require('../middlewares/validator');

// gets all movies saved by the current user
moviesRouter.get('/movies', getSavedMovies);

// creates new saved movie
moviesRouter.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(method),
      trailer: Joi.string().required().custom(method),
      thumbnail: Joi.string().required().custom(method),
      owner: Joi.string().required().hex(),
      movieId: Joi.number().required(),
    }),
  }),
  addSavedMovie,
);

// deletes saved movie
moviesRouter.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.number().required(),
    }),
  }),
  deleteSavedMovie,
);

module.exports = moviesRouter;
