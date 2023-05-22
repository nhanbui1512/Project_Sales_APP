const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    GenerateAccpectToken(user) {
        return jwt.sign(
            {
                IDUser: user.IDUser,
                access: user.Access,
                userName: user.UserName,
            },
            process.env.JWT_PASS,
            {
                expiresIn: '30d',
            },
        );
    },
};
