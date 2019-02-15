const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./resolvers')
const db = require('./db')
const permissions = require('./permissions')

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    middlewares: [permissions],
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  })
}

module.exports = createServer
