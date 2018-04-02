'use strict';
import _ from 'lodash';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';
var env = require('node-env-file');

// Constants
const GRAPHQL_PORT = 8080;
const ENGINE_API_KEY = process.env.ENGINE_API_KEY; // Should be kept secret.

const graphQLServer = express();
const engine = new ApolloEngine({ apiKey: ENGINE_API_KEY });

// Api
graphQLServer.use(compression());
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  tracing: true,
  cacheControl: true
}));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

engine.listen({
  port: GRAPHQL_PORT,
  graphqlPaths: ['/graphql'],
  expressApp: graphQLServer,
  launcherOptions: {
    startupTimeout: 3000,
  },
}, () => {
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql with ApolloEngine!`
  )
});
// DB Conn



