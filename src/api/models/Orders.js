const { Model, DataTypes } = require('sequelize')
const { MySQL } = require('../../modules/MySQL')

class Orders extends Model {}

Orders.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    service_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: MySQL,
    modelName: 'orders',
    freezeTableName: true,
})

module.exports.Orders = Orders