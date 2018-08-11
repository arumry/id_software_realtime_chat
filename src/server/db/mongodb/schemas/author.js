const mongoose = require('mongoose');

const settings = {
  id: {
    type: String,
    required: true,
    index: true,
  },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  nickname: {
    type: String,
  },
};

const AuthorSchema = new mongoose.Schema(settings);

module.exports = mongoose.model('authors', AuthorSchema);
