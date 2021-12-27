require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGODB_URI = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const router = require('./routes/index');

mongoose.connect(MONGODB_URI).catch((err) => console.log(err.message));

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://movie-explorer.nomoredomains.rocks',
    'https://movie-explorer.nomoredomains.rocks',
  ],
  credentials: true,
};

app.use(requestLogger);
app.use(cors(corsOptions));
app.use(helmet());

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
