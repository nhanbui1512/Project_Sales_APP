const homeRouter = require('./homeRoute');
const userRoute = require('./userRoute');
const salesRoute = require('./salesRoute');
const loginRoute = require('./loginRoute');
const commentRoute = require('./commentRoute');
const typeRoute = require('./typeGoods');
const orderRoute = require('./orderRoute');
const cartRoute = require('./cartRoute');

const isLoginMiddleWare = require('../App/Middleware/isLoginMiddleware');
const adminMidleWare = require('../App/Middleware/adminMidleware');

function route(app) {
    app.use('/api/user', userRoute);
    app.use('/api/sales', isLoginMiddleWare, salesRoute);
    app.use('/api/login', loginRoute);
    app.use('/api/comment', isLoginMiddleWare, commentRoute);
    app.use('/api/type', isLoginMiddleWare, adminMidleWare, typeRoute);
    app.use('/api/order', isLoginMiddleWare, orderRoute);
    app.use('/api/cart', isLoginMiddleWare, cartRoute);
    app.use('/', homeRouter);
}
module.exports = route;
