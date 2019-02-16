const { rule } = require('graphql-shield')

const isAuthenticated = rule()((parent, args, ctx, info) => ctx.request.user !== null)

module.exports.isAuthenticated = isAuthenticated
