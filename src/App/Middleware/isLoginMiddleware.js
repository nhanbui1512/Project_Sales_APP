require('dotenv').config();

const jwt = require('jsonwebtoken');

const isLoginMiddleWare = (req, response, next) => {
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            var decode = jwt.verify(token, process.env.JWT_PASS);
            req.IDUser = decode.IDUser;
            req.access = decode.access;
            req.user_name = decode.user_name;
            next();
        } catch (error) {
            console.log(error);
            response.status(200).json({ result: false, message: 'Can Phai Login' });
            return;
        }
    } else {
        response.status(200).json({ result: false, message: 'Can Phai Login' });
        return;
    }
};

module.exports = isLoginMiddleWare;
