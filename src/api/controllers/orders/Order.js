const { createOrder, cancelOrder, getOrders, getOrder } = require('../../services/orders/Order');

module.exports = {

    /* A function that is being exported. */
    createOrder: async function(ctx) {
        return (ctx.response.body = await createOrder(ctx.request.body, ctx.request.user));
    },

    /* A function that is being exported. */
    cancelOrder: async function(ctx) {
        return (ctx.response.body = await cancelOrder(ctx.request.params, ctx.request.user));
    },

    /* A function that is being exported. */
    getOrders: async function(ctx) {
        return (ctx.response.body = await getOrders(ctx.request.body, ctx.request.user));
    },

    /* A function that is being exported. */
    getOrder: async function(ctx) {
        return (ctx.response.body = await getOrder(ctx.request.params, ctx.request.user));
    }

}