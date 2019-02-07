const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')

const MAX_TOKEN_AGE = 1000 * 60 * 60 * 24 * 365

const user = {
  async createUser(parent, args, ctx, info) {
    const email = args.email.toLowerCase()
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          email,
          password
        }
      },
      info
    )

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: MAX_TOKEN_AGE
    })
    return user
  },

  async signin(parent, { email, password }, ctx, info) {
    // see if user exists
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No user found for ${email}`)
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Incorrect password')
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: MAX_TOKEN_AGE
    })
    return user
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'Sign out successful!' }
  },

  async requestPasswordReset(parent, { email }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error('No account found for that email')
    }

    const resetToken = (await promisify(randomBytes)(20)).toString('hex')
    const resetTokenExpiry = Date.now() + 1000 * 60 * 60

    // TODO - Set up email message

    ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })

    return { message: resetToken } // 'Password Reset Request Successful'
  },

  async resetPassword(parent, args, ctx, info) {
    const { password, confirmPassword, resetToken } = args
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    const [user] = await ctx.db.query.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now()
      }
    })
    if (!user) {
      throw new Error('Invalid or expired reset token')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    })
    if (!user) {
      throw new Error('Unable to update password')
    }

    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: MAX_TOKEN_AGE
    })
    return updatedUser
  }
}

module.exports = user
