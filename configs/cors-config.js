module.exports.corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3000/signin',
    'http://localhost:3000/movies',
    'http://movie-explorer.nomoredomains.rocks',
    'https://movie-explorer.nomoredomains.rocks',
  ],
  credentials: true,
};
