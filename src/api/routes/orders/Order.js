const Router = require('koa-router')
const router = new Router()

const { createOrder, cancelOrder, getOrders, getOrder } = require('../../controllers/orders/Order')
const Authorized = require('../../middlewares/Authorized')

router.get('/all', Authorized, getOrders)
router.post('/create', Authorized, createOrder)
router.get('/:id/cancel', Authorized, cancelOrder)
router.get('/:id', Authorized, getOrder)

module.exports.Order = router