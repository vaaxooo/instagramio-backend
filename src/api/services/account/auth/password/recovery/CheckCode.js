const { apiErrorLog } = require('../../../../../../modules/Logger')
const Validator = require('validatorjs')
const { Users } = require('../../../../../models/Users')

/**
 * @param params
 * @returns {Promise<{errors: {}, status: boolean}|{message: string, status: boolean}>}
 * @constructor
 */
module.exports.CheckCode = async params => {
    try {
        const validation = new Validator(params, { email: 'required', code: 'required' })
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
        return {
            status: true,
            message: 'You can recover your password',
        }
    } catch (error) {
        apiErrorLog(error)
    }
}