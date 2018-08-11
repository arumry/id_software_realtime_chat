const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    me: async (parent, args, { token, mongo }) => {
      const decoded = jwt.decode(token);
      const {
        user: { id },
      } = decoded;
      return mongo.schemas.Author.findOne({
        id,
      }).select('id username nickname');
    },
  },
  Mutation: {
    changeNickname: async (parent, { nickname }, { token, mongo }) => {
      const decoded = jwt.decode(token);
      const {
        user: { id },
      } = decoded;

      const author = await mongo.schemas.Author.findOne({
        id,
      });
      author.nickname = nickname;
      return author.save();
    },
  },
};
