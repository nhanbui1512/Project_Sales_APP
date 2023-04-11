const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sales_app',
});

connection.connect((err) => {
    if (err) {
        console.log('connect to DB unsuccessful');
    } else {
        console.log('connect to DB successful');
    }
});

module.exports = connection;
