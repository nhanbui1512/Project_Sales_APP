const sequelize = require('./Connection');
const { DataTypes } = require('sequelize');
const Product = require('./PostSales');

const Cart = sequelize.define(
    'Cart',
    {
        IDCart: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        IDUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'IDUser',
            },
        },
        IDPost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'postsales',
                key: 'IDPost',
            },
        },
        Count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        tableName: 'carts',
        timestamps: false,
    },
);

sequelize.sync();
module.exports = Cart;
