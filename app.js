require('dotenv-flow').config()

const koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const { MySQL } = require('./src/modules/MySQL')

const app = new koa()

app.use(bodyParser())
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

/**
 * IMPORT ROUTES
 */
const { User } = require('./src/api/routes/account/User')
router.use('/api/account', User.routes())

const { Auth } = require('./src/api/routes/account/Auth')
router.use('/api/auth', Auth.routes())

const { Service } = require('./src/api/routes/orders/Service')
router.use('/api/services', Service.routes())

const { Order } = require('./src/api/routes/orders/Order')
router.use('/api/orders', Order.routes())

app.listen(process.env.PORT, process.env.HOST, async() => {
    await MySQL.sync()
    console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`)
})