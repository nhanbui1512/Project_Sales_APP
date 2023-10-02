const { Sequelize } = require('sequelize');
const { sequelize } = require('../../App/Model/Sequelize_Model');

const connection = new Sequelize('', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

connection
    .query(`CREATE DATABASE IF NOT EXISTS shopee`)
    .then((res) => {
        if (res[0].affectedRows) {
            console.log('Database is not exists, it is created successful');
        }

        sequelize
            .sync({ alter: true })
            .then(() => {
                console.log('synced');
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err.message);
    });
