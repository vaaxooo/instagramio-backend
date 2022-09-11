const { createTransaction, getTransactions, successTransaction } = require('../../services/transactions/Transaction');

module.exports = {

    /* A function that is being exported. */
    createTransaction: async(ctx) => {
        return (ctx.response.body = await createTransaction(ctx.request.body, ctx.request.user));
    },

    /* A function that is being exported. */
    getTransactions: async(ctx) => {
        return (ctx.response.body = await getTransactions(ctx.request.user));
    },

    successTransaction: async(ctx) => {
        return (ctx.response.body = await successTransaction(ctx.request.body));
    }

}