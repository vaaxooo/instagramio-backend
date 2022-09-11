const { apiErrorLog } = require('../../../modules/Logger')
const { Users } = require('../../models/Users');
const { Transactions } = require('../../models/Transactions');
const axios = require('axios');
const CryptoJS = require('crypto-js');

const Validator = require('validatorjs');

module.exports = {

    /* Creating a transaction. */
    createTransaction: async(params, user) => {
        try {
            const rules = {
                amount: 'required',
                type: 'required',
            }
            const validation = new Validator(params, rules)
            if (validation.fails()) {
                return {
                    status: false,
                    errors: validation.errors.errors,
                }
            }
            const order_id = Date.now() + Math.floor(Math.random() * 1000) + user.id;
            let signature = ''
            signature = process.env.FONDY_SECRET_KEY + '|' + (params.amount * 100) + '|USD|' + process.env.FONDY_MERCHANT_ID + '|Пополнение баланса|' + order_id + '|' + process.env.FONDY_RESPONSE_URL + '|' + process.env.FONDY_SERVER_CALLBACK_URL
            signature = CryptoJS.SHA1(signature).toString()
            await Transactions.create({
                user_id: user.id,
                amount: params.amount,
                type: params.type,
                order_id: order_id,
                currency: 'USD',
                status: 'pending',
                signature: signature
            });
            return {
                status: true,
                message: 'Transaction created successfully',
                data: {
                    merchant_id: process.env.FONDY_MERCHANT_ID,
                    amount: params.amount * 100,
                    currency: 'USD',
                    order_id: order_id,
                    order_desc: 'Пополнение баланса',
                    response_url: process.env.FONDY_RESPONSE_URL,
                    server_callback_url: process.env.FONDY_SERVER_CALLBACK_URL,
                    signature: signature
                }
            }
        } catch (error) {
            apiErrorLog(error);
            return { status: false, message: 'Error creating transaction.', error };
        }
    },

    /* Updating the user balance and transaction status. */
    successTransaction: async function(params) {
        try {
            const transaction = await Transactions.findOne({
                where: {
                    order_id: params.order_id
                }
            })
            if (transaction) {
                if (transaction.status == 'success') {
                    return {
                        status: true,
                        message: 'Transaction already success',
                        data: transaction
                    }
                }
                if (transaction.status == 'pending') {
                    const user = await Users.findOne({
                        where: {
                            id: transaction.user_id
                        }
                    })
                    if (user) {
                        let amount = +transaction.amount
                        user.balance = +user.balance + +amount
                        await user.save()
                        transaction.status = 'success'
                        await transaction.save()
                        return {
                            status: true,
                            message: 'Transaction success',
                            data: transaction
                        }
                    } else {
                        return {
                            status: false,
                            message: 'User not found'
                        }
                    }
                }
            } else {
                return {
                    status: false,
                    message: 'Transaction not found'
                }
            }
        } catch (error) {
            apiErrorLog(error);
            return { status: false, message: 'Error creating transaction.', error };
        }
    },

    /* A function that gets all transactions of a user. */
    getTransactions: async function(user) {
        try {
            const transactions = await Transactions.findAll({
                where: {
                    user_id: user.id
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            return {
                status: true,
                data: transactions
            }
        } catch (error) {
            apiErrorLog(error);
            return { status: false, message: 'Error getting transactions.' };
        }
    }

}