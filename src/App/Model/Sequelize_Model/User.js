const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sales_app', 'root', '', {
    dialect: 'mysql',
});

sequelize
    .authenticate({ logging: () => {} })
    .then(() => {
        console.log('connect thanh cong');
    })
    .catch((err) => {
        console.log(err);
    });

const User = sequelize.define(
    'User',
    {
        IDUser: {
            type: DataTypes.INTEGER,
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
sequelize.sync();
module.exports = User;
