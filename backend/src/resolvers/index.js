const user = require('./Mutation/user')

module.exports = {
  // Query: {},
  Mutation: {
    ...user
  }
}
