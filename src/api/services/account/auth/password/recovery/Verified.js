const { apiErrorLog } = require('../../../../../../modules/Logger')
const Validator = require('validatorjs')
const bcrypt = require('bcrypt')
const { Users } = require('../../../../../models/Users')

/**
 * @param params
 * @returns {Promise<{errors: {}, status: boolean}|{message: string, status: boolean}>}
 * @constructor
 */
module.exports.Verified = async params => {
    try {
        const validation = new Validator(params, { email: 'required', code: 'required', password: 'required|min:8' })
        if (validation.fails()) {
            return {
                status: false,
                errors: validation.errors.errors,
            }
        }
        if (!(await Users.findOne({ where: { recoveryCode: params.code, email: params.email } }))) {
            return {
                status: false,
                message: 'User is not found',
            }
        }
        await Users.update({
            password: await bcrypt.hash(params.password, 12),
            recoveryCode: null,
        }, { where: { recoveryCode: params.code, email: params.email } })
        return {
            status: true,
            message: 'Your password has been changed',
        }
    } catch (error) {
        apiErrorLog(error)
    }
}