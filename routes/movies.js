const moviesRouter = require('express').Router();

const { getSavedMovies, addSavedMovie, deleteSavedMovie } = require('../controllers/movies');

const { newMovieValidator, deleteMovieValidator } = require('../middlewares/req-validator');

// gets all movies saved by the current user
moviesRouter.get('/movies', getSavedMovies);

// creates new saved movie
moviesRouter.post(
  '/movies',
  newMovieValidator,
  addSavedMovie,
);

// deletes saved movie
moviesRouter.delete(
  '/movies/:movieId',
  deleteMovieValidator,
  deleteSavedMovie,
);

module.exports = moviesRouter;
