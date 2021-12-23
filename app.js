const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const notFoundRoute = require('./routes/notFoundRoute');

mongoose
  .connect('mongodb://localhost:27017/moviesdb')
  .catch((err) => console.log(err.message));

app.use((req, res, next) => {
  req.user = {
    _id: '61c4c5849236fcf14191758c',
  };
  next();
});

app.use('/', usersRoutes);
app.use('/', moviesRoutes);
app.use('*', notFoundRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
