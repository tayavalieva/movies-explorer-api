const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
      type: String,
      required: true
    },
  image: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /^(https?:\/\/)(www\.)?(([\w-])+\.)+([a-z]{2,6})(\/[\S]{1,})?/gi.test(v);
        },
        message: 'Неправильный формат ссылки',
      },
    },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?(([\w-])+\.)+([a-z]{2,6})(\/[\S]{1,})?/gi.test(v);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?(([\w-])+\.)+([a-z]{2,6})(\/[\S]{1,})?/gi.test(v);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieID: {
    type: Number,
    required: true,
  }

});

module.exports = mongoose.model('movie', movieSchema);