const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sales_app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Connection unsuccessfully.');
    });

module.exports = sequelize;
