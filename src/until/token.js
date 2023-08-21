const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    GenerateAccpectToken(user) {
        return jwt.sign(
            {
                IDUser: user.userId,
                access: user.accessAccessId,
                userName: user.userName,
                email: user.email,
            },
            process.env.JWT_PASS,
            {
                expiresIn: '30d',
            },
        );
    },
};
