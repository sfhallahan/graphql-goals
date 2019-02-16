const { shield, not, allow } = require('graphql-shield')
const { isAuthenticated } = require('./rules')

const permissions = shield(
  {
    Query: {
      me: allow
    },
    Mutation: {
      createUser: allow,
      signin: allow,
      signout: allow,
      requestPasswordReset: allow,
      resetPassword: allow
    }
  },
  {
    fallbackRule: allow
  }
)

module.exports = permissions
