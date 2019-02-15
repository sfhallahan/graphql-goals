const userMutations = require('./Mutation/user')
const userQueries = require('./Query/user')

module.exports = {
  Query: {
    ...userQueries
  },
  Mutation: {
    ...userMutations
  }
}
