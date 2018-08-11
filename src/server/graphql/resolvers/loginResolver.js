const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { PASSWORD_SECRET } = process.env;

module.exports = {
  Mutation: {
    login: async (parent, { username, password }, { mongo }) => {
      const user = await mongo.schemas.Author.findOne({
        username,
      });
      if (!user) throw Error('No such user found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw Error('Incorrect password');

      const token = jwt.sign(
        {
          user: _.pick(user, ['id', 'username']),
        },
        PASSWORD_SECRET,
        { expiresIn: '1y' },
      );

      return token;
    },
  },
};
