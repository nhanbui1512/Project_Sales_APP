const homeRouter = require('./homeRoute');
const userRoute = require('./userRoute');
const salesRoute = require('./salesRoute');
const loginRoute = require('./loginRoute');

const isLoginMiddleWare = require('../App/Middleware/isLoginMiddleware');

function route(app) {
    app.use('/', homeRouter);
    app.use('/api/user', userRoute);
    app.use('/api/sales', isLoginMiddleWare, salesRoute);
    app.use('/api/login', loginRoute);
}
module.exports = route;
