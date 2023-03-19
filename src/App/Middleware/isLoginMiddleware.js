require('dotenv').config();

const jwt = require('jsonwebtoken');

const isLoginMiddleWare = (req, response, next) => {
    try {
        const token = req.body.token;
        var decode = jwt.verify(token, process.env.JWT_PASS);
        console.log(decode);
        next();
    } catch (error) {
        console.log(error);
        response.status(200).json({ res: 'token sai' });
    }
};

module.exports = isLoginMiddleWare;
