const express = require('express');
const cors = require('cors');
const path = require('path');
const port = 3000;
const app = express();
const route = require('./routes');
const db = require('./Config/Db');

const User = require('./App/Model/Sequelize_Model/User');

User.findAll()
    .then((users) => {
        console.log(users[0].dataValues);
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cors());
route(app);

db.connect;

app.listen(port, () => {
    console.log(`Listening at localhost:${port}`);
});
