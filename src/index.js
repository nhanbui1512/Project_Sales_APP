const express = require('express');
const path = require('path');
const port = 3000;
const app = express();
const route = require('./routes');
const db = require('./Config/Db');
app.use(express.json());

route(app);

db.connect;

app.listen(port, () => {
    console.log(`Listening at localhost:${port}`);
});
