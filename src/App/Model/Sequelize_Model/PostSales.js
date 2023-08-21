const sequelize = require('./Connection');
const { DataTypes } = require('sequelize');
const Cart = require('./Cart');
const User = require('./User');

const Product = sequelize.define(
    'postsales',
    {
        IDPost: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: {
            type: DataTypes.STRING,
        },
        Description: {
            type: DataTypes.STRING,
        },
        CreateAt: {
            type: DataTypes.DATE,
        },
        UpdateAt: {
            type: DataTypes.DATE,
        },
        IDUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'IDUser',
            },
        },
        IDType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'typegoods',
                key: 'IDType',
            },
        },
        Price: {
            type: DataTypes.BIGINT,
        },
        Discount: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: 'postsales',
        timestamps: false,
    },
);

sequelize.sync();
module.exports = Product;
