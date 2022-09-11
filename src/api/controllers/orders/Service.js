const { getAllServices, getServicesByCategory } = require('../../services/orders/Service')


module.exports = {

    /**
     * @param ctx
     * @returns {Promise<{errors: {}, status: boolean}|{message: string, status: boolean}>}
     */
    getAllServices: async function(ctx) {
        return (ctx.response.body = await getAllServices(ctx.request.body))
    },

    /* A function that is called when the user makes a request to the server. */
    getServicesByCategory: async function(ctx) {
        return (ctx.response.body = await getServicesByCategory(ctx.request.params))
    }

}