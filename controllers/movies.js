const Movie = require('../models/movie');
const BadRequest = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const ForbiddenError = require('../errors/forbidden');

module.exports.getSavedMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

module.exports.addSavedMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year,
    description, image, trailer, nameRU, nameEN, thumbnail, id,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    id,
    owner,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введеные данные в неверном формате'));
      } else { next(err); }
    });
};

module.exports.deleteSavedMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Film not found');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав для удаления фильма');
      }
      return Movie.findByIdAndDelete(req.params.movieId)
        .then(res.status(200).send({ data: movie }));
    })
    .catch(next);
};
