const user = {
  me(parent, args, ctx, info) {
    const userId = ctx.request.userId
    if (!userId) return null
    return ctx.db.query.user({ where: { id: userId } })
  }
}
