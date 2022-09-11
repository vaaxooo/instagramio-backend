const Router = require('koa-router')
const router = new Router()
const Authorized = require('../../middlewares/Authorized')

const { me, change_password, update } = require('../../controllers/account/User')

router.get('/me', Authorized, me)

router.patch('/update', Authorized, update)
router.patch('/password/change', Authorized, change_password)

module.exports.User = router