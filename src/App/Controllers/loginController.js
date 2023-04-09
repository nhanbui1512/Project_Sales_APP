const userModel = require('../Model/user.model');
const token_require = require('../../until/token');
require('dotenv').config();

class loginController {
    //GET all sales post
    checkLogin(req, response) {
        const userName = req.body.user_name;
        const passWord = req.body.password;

        userModel
            .checkLogin({ userName: userName, password: passWord })
            .then((res) => {
                if (res.length > 0) {
                    const user = res[0];
                    const token = token_require.GenerateAccpectToken(user);
                    return response.status(200).json({ result: true, message: 'login successful', token: token });
                } else {
                    return response.status(200).json({ result: false, message: 'username or password is not valid' });
                }
            })
            .catch((err) => {
                console.log(err);
                return response.status(500).json({ res: 'Error Server' });
            });
    }
}
module.exports = new loginController();
