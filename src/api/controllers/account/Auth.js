const { Register } = require('../../services/account/auth/Register')
const { Login } = require('../../services/account/auth/Login')

const { SendCode } = require('../../services/account/auth/password/recovery/SendCode')
const { CheckCode } = require('../../services/account/auth/password/recovery/CheckCode')
const { Verified } = require('../../services/account/auth/password/recovery/Verified')

module.exports = {
    /**
     * @param ctx
     * @returns {Promise<{errors: {}, status: boolean}|{message: string, status: boolean}>}
     */
    register: async function(ctx) {
        return (ctx.response.body = await Register(ctx.request.body))
    },

    /**
     * @param ctx
     * @returns {Promise<any>}
     */
    login: async function(ctx) {
        return (ctx.response.body = await Login(ctx.request.body))
    },

    /**
     * @param ctx
     * @returns {Promise<{errors: {}, status: boolean}|{message: string, status: boolean}>}
     */
    recovery: async function(ctx) {
        return (ctx.response.body = await SendCode(ctx.request.body))
    },

    /**
     * @param ctx
     * @returns {Promise<any>}
     */
    recovery_check: async function(ctx) {
        return (ctx.response.body = await CheckCode(ctx.request.body))
    },

    /**
     * @param ctx
     * @returns {Promise<any>}
     */
    recovery_verified: async function(ctx) {
        return (ctx.response.body = await Verified(ctx.request.body))
    },
}