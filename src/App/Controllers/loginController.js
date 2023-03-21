const userModel = require('../Model/user.model');
const token_require = require('../../until/token')
require('dotenv').config();

class loginController {
    //GET all sales post
    checkLogin(req, response) {
        const userName = req.body.user_name;
        const passWord = req.body.password;

        userModel
            .checkLogin({ userName: userName, password: passWord })
            .then((res) => {
                console.log(res);
                if (res.length > 0) {
                    const user = res[0];
                    const token = token_require.GenerateAccpectToken(user)
                    response.status(200).json({ message: 'login successful', token: token });
                } else {
                    response.status(200).json({ message: 'username or password is not valid' });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ res: 'Error Server' });
            });
    }
}
module.exports = new loginController();
