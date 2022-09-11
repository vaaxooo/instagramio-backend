const Router = require('koa-router')
const router = new Router()

const { getAllServices, getServicesByCategory } = require('../../controllers/orders/Service')

router.get('/all', getAllServices)
router.get('/by-category/:category', getServicesByCategory)

module.exports.Service = router