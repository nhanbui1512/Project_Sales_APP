const homeRouter = require('./homeRoute');
const userRoute = require('./userRoute');

function route(app) {
    app.use('/', homeRouter);
    app.use('/api/user', userRoute);
}
module.exports = route;
