import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';
import resolvers from './resolvers';

const typeDefs = `
type Query {
    user(id: ID, username: String): User
    allUsers: [User]
    connections(src_id: ID!): [User]
    allConnections: [Connection]
}

type User {
    id: Int
    firstName: String
    lastName: String
    username: String
    email: String
    connections: [User]
}

type Connection {
    id: Int
    src_id: Int
    conn_id: Int
    status: String
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true });

export default schema;
