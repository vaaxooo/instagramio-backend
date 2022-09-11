const { Model, DataTypes } = require('sequelize')
const { MySQL } = require('../../modules/MySQL')

class Transactions extends Model {}

Transactions.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    amount: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    order_id: { type: DataTypes.STRING, allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    signature: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize: MySQL,
    modelName: 'transactions',
    freezeTableName: true,
})

module.exports.Transactions = Transactions