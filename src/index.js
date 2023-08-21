const express = require('express');
const cors = require('cors');
const path = require('path');
const port = 3000;
const app = express();
const route = require('./routes');
const { sequelize } = require('./App/Model/Sequelize_Model');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('synced');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
route(app);

// db.connect;

app.listen(port, () => {
    console.log(`Listening at localhost:${port}`);
});
