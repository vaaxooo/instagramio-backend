const { User } = require('../../services/account/User')
const { Update } = require('../../services/account/Update')

const { ChangePassword } = require('../../services/account/auth/password/ChangePassword')

module.exports = {
    /**
     * @param ctx
     * @returns {Promise<{user}>}
     */
    me: async function(ctx) {
        return (ctx.response.body = await User(ctx.request.user))
    },

    /**
     * @param ctx
     * @returns {Promise<{errors: {}, status: boolean}|{message: string, status: boolean}|{message: string, status: boolean}>}
     */
    change_password: async function(ctx) {
        return (ctx.response.body = await ChangePassword(ctx.request.body, ctx.request.user))
    },

    /**
     * Changes user data
     * @param {*} ctx
     * @returns
     */
    update: async function(ctx) {
        return (ctx.response.body = await Update(ctx.request.body, ctx.request.user))
    }
}