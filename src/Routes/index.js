const homeRouter = require('./homeRoute')


function route(app){

    app.use('/',homeRouter);
}
module.exports = route;