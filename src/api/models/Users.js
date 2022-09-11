const { Model, DataTypes } = require('sequelize')
const { MySQL } = require('../../modules/MySQL')

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: '0.00',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'user',
    },
}, {
    sequelize: MySQL,
    modelName: 'users',
    freezeTableName: true,
})

module.exports.Users = Users