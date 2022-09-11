const { Services } = require('../../models/Services')
const { Users } = require('../../models/Users')

module.exports = {

    /* A function that is used to get all the services. */
    getAllServices: async function(params) {
        try {
            const services = await Services.findAll()
            return {
                status: true,
                data: services
            }
        } catch (error) {
            return { status: false, errors: error }
        }
    },

    /* A function that is used to get all the services by category. */
    getServicesByCategory: async function(params) {
        try {
            const services = await Services.findAll({
                where: {
                    category: params.category
                }
            })
            return {
                status: true,
                data: services
            }
        } catch (error) {
            return { status: false, errors: error }
        }
    }

}