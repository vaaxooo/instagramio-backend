const Router = require('koa-router')
const router = new Router()

const { register, login, recovery, recovery_check, recovery_verified } = require('../../controllers/account/Auth')

router.post('/register', register)
router.post('/login', login)
router.post('/password/recovery', recovery)
router.post('/password/recovery/check', recovery_check)
router.post('/password/recovery/verified', recovery_verified)

module.exports.Auth = router