const { rule, shield } = require('graphql-shield');
const jwt = require('jsonwebtoken');

const { PASSWORD_SECRET } = process.env;

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { token }) => {
    await jwt.verify(token, PASSWORD_SECRET);
    return Promise.resolve(true);
  },
);

const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      messages: isAuthenticated,
    },
    Mutation: {
      changeNickname: isAuthenticated,
      createMessage: isAuthenticated,
    },
  },
  { allowExternalErrors: true },
);

module.exports = permissions;
