const { Model, DataTypes } = require('sequelize')
const { MySQL } = require('../../modules/MySQL')

class Services extends Model {}

Services.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    min_order: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    max_order: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    service_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    sequelize: MySQL,
    modelName: 'services',
    freezeTableName: true,
})

module.exports.Services = Services