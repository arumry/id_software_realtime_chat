const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const { NEW_MESSAGE_TOPIC } = process.env;

module.exports = {
  Query: {
    messages: (parent, args, { mongo }) => mongo.schemas.Messages.find(),
  },
  Message: {
    author: ({ authorId }, args, { mongo }) =>
      mongo.schemas.Author.findOne({
        id: authorId,
      }).select('id username nickname'),
  },
  Mutation: {
    createMessage: async (parent, args, { token, mongo, pubsub }) => {
      const decoded = jwt.decode(token);
      const {
        user: { id },
      } = decoded;
      const newMessage = {
        id: uuidv4(),
        payload: args.message.payload,
        authorId: id,
      };
      pubsub.publish(NEW_MESSAGE_TOPIC, { newMessage });
      return mongo.schemas.Messages.create(newMessage);
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator(NEW_MESSAGE_TOPIC),
    },
  },
};
