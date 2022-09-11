const { apiErrorLog } = require('../../../../../../modules/Logger')
const Validator = require('validatorjs')
const crypto = require('crypto')
const { Mailer } = require('../../../../../../modules/Mailer')
const { Users } = require('../../../../../models/Users')

/**
 * import mailer templates
 */
const { Recovery } = require('../../../../../../modules/mailer_templates/Recovery')

/**
 * @param params
 * @returns {Promise<{errors: {}, status: boolean}|{message: string, status: boolean}>}
 * @constructor
 */
module.exports.SendCode = async params => {
    try {
        const validation = new Validator(params, { email: 'required' })
        if (validation.fails()) {
            return {
                status: false,
                errors: validation.errors.errors,
            }
        }
        if (!(await Users.findOne({ where: { email: params.email } }))) {
            return {
                status: false,
                message: 'User is not found',
            }
        }
        const recoveryCode = crypto
            .createHmac('md5', process.env.JWT_SECRET_KEY)
            .update(params.email + ':' + new Date())
            .digest('hex')
        await Users.update({ recoveryCode }, { where: { email: params.email } })
        await Mailer({
            to: params.email,
            subject: 'Recovery password',
            html: Recovery(recoveryCode),
        })
        return {
            status: true,
            message: 'A password reset code has been sent to your email',
        }
    } catch (error) {
        apiErrorLog(error)
    }
}