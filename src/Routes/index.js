const homeRouter = require('./homeRoute');
const userRoute = require('./userRoute');
const salesRoute = require('./salesRoute');
const loginRoute = require('./loginRoute');
const commentRoute = require('./commentRoute');
const typeRoute = require('./typeGoods');

const isLoginMiddleWare = require('../App/Middleware/isLoginMiddleware');

function route(app) {
    app.use('/', homeRouter);
    app.use('/api/user', userRoute);
    app.use('/api/sales', isLoginMiddleWare, salesRoute);
    app.use('/api/login', loginRoute);
    app.use('/api/comment', isLoginMiddleWare, commentRoute);
    app.use('/api/type', typeRoute);
}
module.exports = route;
