require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { corsOptions } = require('./configs/cors-config');

const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_URL } = require('./configs/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const router = require('./routes/index');

mongoose.connect(MONGO_URL).catch((err) => console.log(err.message));

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
