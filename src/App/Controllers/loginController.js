const userModel = require('../Model/user.model');
const token_require = require('../../until/token');
const { User, Access } = require('../Model/Sequelize_Model');

require('dotenv').config();

class loginController {
    //GET all sales post
    async checkLogin(req, response) {
        const email = req.body.email;
        const passWord = req.body.password;

        try {
            var user = await User.findOne({
                where: {
                    email: email,
                    passWord: passWord,
                },
            });

            if (user === null) {
                return response.status(200).json({ result: false, message: 'email or password is wrong' });
            } else {
                user = user.toJSON();
                const token = token_require.GenerateAccpectToken(user);
                return response.status(200).json({ result: true, token: token });
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: error.message });
        }
    }
}
module.exports = new loginController();
