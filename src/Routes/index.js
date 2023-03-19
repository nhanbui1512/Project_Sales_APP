const homeRouter = require('./homeRoute');
const userRoute = require('./userRoute');
const salesRoute = require('./salesRoute');
function route(app) {
    app.use('/', homeRouter);
    app.use('/api/user', userRoute);
    app.use('/api/sales', salesRoute);
}
module.exports = route;
