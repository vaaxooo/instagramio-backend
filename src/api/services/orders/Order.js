const { apiErrorLog } = require('../../../modules/Logger')
const { Orders } = require('../../models/Orders');
const { Services } = require('../../models/Services');
const { Users } = require('../../models/Users');
const axios = require('axios');

const Validator = require('validatorjs');

module.exports = {

    /* A function that is being exported. */
    createOrder: async function(params, user) {
        try {
            const rules = {
                category: 'required',
                service_id: 'required',
                url: 'required',
                quantity: 'required'
            }
            const validation = new Validator(params, rules)
            if (validation.fails()) {
                return {
                    status: false,
                    errors: validation.errors.errors,
                }
            }
            let service = await Services.findOne({
                where: {
                    service_id: params.service_id
                }
            });
            if (!service) {
                return {
                    status: false,
                    message: 'Service not found'
                }
            }
            const price = (+service.price * (+params.quantity / 1000))
            if (user.balance < price) {
                return {
                    status: false,
                    message: 'Not enough money on your balance'
                }
            }
            if (params.quantity < service.min_order) {
                return {
                    status: false,
                    message: 'Quantity is less than minimum'
                }
            }
            if (params.quantity > service.max_order) {
                return {
                    status: false,
                    message: 'Quantity is more than maximum'
                }
            }
            await Users.update({ balance: +user.balance - +price }, { where: { id: user.id } })
            const response = (await axios.get('https://nakrutka.com/api/', {
                params: {
                    key: '924c363b31ad615745ba2a1f0cd023cd',
                    action: 'create',
                    service: params.service_id,
                    quantity: params.quantity,
                    link: params.url
                }
            })).data;
            if (response.order) {
                let order = await Orders.create({
                    ...params,
                    price: price,
                    user_id: user.id,
                    order_id: response.order,
                });
                return {
                    status: true,
                    message: 'Order created successfully',
                    data: order
                }
            }
            return {
                status: false,
                message: 'Order not created'
            }
        } catch (error) {
            apiErrorLog(error)
            return { status: false, errors: error }
        }
    },

    /* Updating the balance of the user by adding the price of the order to the balance of the user. */
    cancelOrder: async function(params, user) {
        try {
            let order = await Orders.findOne({ where: { order_id: params.id } });
            if (!order) {
                return {
                    status: false,
                    message: 'Order not found'
                }
            }
            const response = (await axios.get('https://nakrutka.com/api/', {
                params: {
                    key: '924c363b31ad615745ba2a1f0cd023cd',
                    action: 'cancel',
                    order: params.id,
                }
            })).data;
            if (response.success) {
                await Users.update({ balance: +user.balance + +order.price }, { where: { id: user.id } })
                await Orders.update({ status: 'canceled' }, { where: { id: params.id } });
                return {
                    status: true,
                    message: 'Order canceled successfully'
                }
            }
            return {
                status: false,
                message: 'Order not canceled'
            }
        } catch (error) {
            apiErrorLog(error)
            return { status: false, errors: error }
        }
    },

    /* A function that is being exported. */
    getOrders: async function(params, user) {
        try {
            let orders = await Orders.findAll({ where: { user_id: user.id } });
            return {
                status: true,
                data: orders
            }
        } catch (error) {
            apiErrorLog(error)
            return { status: false, errors: error }
        }
    },

    /* A function that is being exported. */
    getOrder: async function(params, user) {
        try {
            let order = await Orders.findOne({ where: { id: params.id, user_id: user.id } });
            return {
                status: true,
                data: order
            }
        } catch (error) {
            apiErrorLog(error)
            return { status: false, errors: error }
        }
    },

}