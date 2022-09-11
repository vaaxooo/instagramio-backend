const { Users } = require('../models/Users')
const jwt = require('jsonwebtoken')
const config = process.env

const verifyToken = async(ctx, next) => {
    try {
        const token = ctx.request.header.authorization.replace('Bearer ', '')
        if (!token) {
            return (ctx.response.body = {
                status: false,
                message: 'The token is required for authorization!',
            })
        }
        let user = jwt.verify(token, config.JWT_SECRET_KEY || 'bf5a14b224ff99991ed15223015970d5')
        user = await Users.findOne({ where: { id: user.user_id } })
        ctx.request.user = user
    } catch (error) {
        return (ctx.response.body = {
            status: false,
            message: 'Invalid token!',
        })
    }
    return next()
}

module.exports = verifyToken