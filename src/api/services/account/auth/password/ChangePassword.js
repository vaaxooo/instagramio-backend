const { apiErrorLog } = require('../../../../../modules/Logger')
const Validator = require('validatorjs')
const bcrypt = require('bcrypt')
const { Users } = require('../../../../models/Users')

/**
 * @param params
 * @param user
 * @returns {Promise<{errors: {}, status: boolean}|{message: string, status: boolean}>}
 * @constructor
 */
module.exports.ChangePassword = async(params, user) => {
    try {
        const rules = {
            current_password: 'required',
            password: 'min:8|required',
        }
        const validation = new Validator(params, rules)
        if (validation.fails()) {
            return {
                status: false,
                errors: validation.errors.errors,
            }
        }
        if (!(await bcrypt.compare(params.current_password, user.password))) {
            return {
                status: false,
                message: 'Current password is incorrect',
            }
        }
        if (await bcrypt.compare(params.password, user.password)) {
            return {
                status: false,
                message: 'The current password cannot be the same as the new one',
            }
        }
        await Users.update({
            password: await bcrypt.hash(params.password, 12),
        }, { where: { id: user.id } })
        return {
            status: true,
            message: 'Password changed successfully',
        }
    } catch (error) {
        apiErrorLog(error)
    }
}