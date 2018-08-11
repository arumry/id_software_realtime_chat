const mongoose = require('mongoose');

const settings = {
  id: {
    type: String,
    required: true,
    index: true,
  },
  payload: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
    index: true,
  },
};

const MessagesSchema = new mongoose.Schema(settings);

module.exports = mongoose.model('messages', MessagesSchema);
