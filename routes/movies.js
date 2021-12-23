const moviesRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const { getSavedMovies, addSavedMovie, deleteSavedMovie } = require('../controllers/movies');

// gets all movies saved by the current user
moviesRouter.get('/movies', getSavedMovies);

// creates new saved movie
moviesRouter.post('/movies', addSavedMovie);

// deletes saved movie
moviesRouter.delete('/movies/:movieId', deleteSavedMovie);

module.exports = moviesRouter;
