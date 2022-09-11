const { apiErrorLog } = require('../../../../modules/Logger')
const Validator = require('validatorjs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users } = require('../../../models/Users')
const { User } = require('../User')

/**
 * @param params
 * @returns {Promise<{errors: {}, status: boolean}|{message: string, status: boolean}|{data: {user: Users}, status: boolean}>}
 * @constructor
 */
module.exports.Login = async params => {
    try {
        const rules = {
            email: 'required',
            password: 'min:8|required',
        }
        const validation = new Validator(params, rules)
        if (validation.fails()) {
            return {
                status: false,
                errors: validation.errors.errors,
            }
        }
        let user = await Users.findOne({ where: { email: params.email } })
        if (!(user && (await bcrypt.compare(params.password, user.password)))) {
            return {
                status: false,
                message: 'Login or password is incorrect',
            }
        }
        user = (await User(user)).user
        let token = jwt.sign({ user_id: user.id, email: params.email }, process.env.JWT_SECRET_KEY || 'bf5a14b224ff99991ed15223015970d5', { expiresIn: '2h' })
        return {
            status: true,
            data: {
                user: user,
                access_token: token,
            },
        }
    } catch (error) {
        apiErrorLog(error)
    }
}