const { apiErrorLog } = require('../../../../modules/Logger')
const Validator = require('validatorjs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users } = require('../../../models/Users')
const { User } = require('../User')

/**
 * @param params
 * @returns {Promise<{data: {user: Users}, message: string, status: boolean}|{errors: {}, status: boolean}|{message: string, status: boolean}>}
 * @constructor
 */
module.exports.Register = async params => {
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
        if (await Users.findOne({ where: { email: params.email } })) {
            return {
                status: false,
                message: 'This user is already registered',
            }
        }
        let user = await Users.create({
            email: params.email.toLowerCase(),
            password: await bcrypt.hash(params.password, 12),
        })
        user = (await User(user)).user
        let access_token = jwt.sign({ user_id: user.id, email: params.email }, process.env.JWT_SECRET_KEY || 'bf5a14b224ff99991ed15223015970d5', { expiresIn: '2h' })
        return {
            status: true,
            message: 'You have successfully registered',
            data: {
                user: user,
                access_token: access_token,
            },
        }
    } catch (error) {
        apiErrorLog(error)
    }
}