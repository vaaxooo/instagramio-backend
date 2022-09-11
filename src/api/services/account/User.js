const { apiErrorLog } = require('../../../modules/Logger')
const { Users } = require('../../models/Users')

/**
 * @param user
 * @returns {Promise<{user: Users}>}
 * @constructor
 */
module.exports.User = async user => {
    try {
        return {
            user: await Users.findOne({
                attributes: ['id', 'email', 'balance', 'role', 'createdAt'],
                where: {
                    id: user.id,
                },
            }),
        }
    } catch (error) {
        apiErrorLog(error)
        return {
            status: false,
            message: 'Oops... Something went wrong!',
        }
    }
}