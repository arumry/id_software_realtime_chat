const bluebird = require('bluebird');
const mongoose = require('mongoose');

const Author = require('./schemas/author');
const Messages = require('./schemas/messages');

const { MONGO_DB_HOST, MONGO_DB_POOL_SIZE } = process.env;

mongoose.Promise = bluebird;

const startConnection = () =>
  mongoose.connect(
    MONGO_DB_HOST,
    {
      poolSize: MONGO_DB_POOL_SIZE,
    },
  );

const endConnection = () => {
  mongoose.disconnect();
};

module.exports = {
  startConnection,
  endConnection,
  schemas: {
    Author,
    Messages,
  },
};
