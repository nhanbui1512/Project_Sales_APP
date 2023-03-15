const express = require('express')
const path = require('path')
const port = 3000;
const app = express();
const route = require('./routes')

route(app)

app.listen(port , () => {
    console.log(`Listening at localhost:${port}`)
})