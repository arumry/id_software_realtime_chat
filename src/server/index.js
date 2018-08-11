const { GraphQLServer, PubSub } = require('graphql-yoga');
const dotenv = require('dotenv');

dotenv.config();
const { PORT } = process.env;

const auth = require('./graphql/auth');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');
const mongo = require('./db/mongodb');

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [auth],
  context: ({ request, connection }) => ({
    token: connection ? null : request.get('Authorization'),
    pubsub,
    mongo,
  }),
});

process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.warn('Sigterm requested, shutting down server');
  mongo.endConnection();
  server.stop();
});

mongo.startConnection();

const options = {
  port: PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

server.start(options, ({ port }) =>
  // eslint-disable-next-line no-console
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
);
