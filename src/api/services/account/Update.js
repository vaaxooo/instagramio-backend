const { apiErrorLog } = require('../../../modules/Logger')
const { Users } = require('../../models/Users')

module.exports.Update = async(params, user) => {
    try {
        let validKeys = ['first_name', 'last_name', 'surname', 'country', 'phone']
        Object.keys(params).forEach(key => validKeys.includes(key) || delete userInput[key])
        await Users.update(params, {
            where: { id: user.id },
        })
        return {
            status: true,
            message: 'The data has been successfully updated',
        }
    } catch (error) {
        apiErrorLog(error)
        return {
            status: false,
            message: 'Oops... Something went wrong!',
        }
    }
}