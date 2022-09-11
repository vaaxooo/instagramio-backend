const Router = require('koa-router')
const router = new Router()

const { createTransaction, getTransactions, successTransaction } = require('../../controllers/transactions/Transaction')
const Authorized = require('../../middlewares/Authorized')

router.post('/create', Authorized, createTransaction)
router.get('/get', Authorized, getTransactions)
router.post('/success', successTransaction)

module.exports.Transaction = router