const { DataTypes } = require('sequelize');
const sequelize = require('./Connection');

const User = sequelize.define(
    'User',
    {
        IDUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        UserName: {
            type: DataTypes.STRING,
        },
        Password: {
            type: DataTypes.STRING,
        },
        Email: {
            type: DataTypes.STRING,
        },
        PhoneNumber: {
            type: DataTypes.STRING,
        },
        AvatarPath: {
            type: DataTypes.STRING,
        },
        Access: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: 'user',
        timestamps: false,
    },
);
// sequelize.sync();
module.exports = User;
