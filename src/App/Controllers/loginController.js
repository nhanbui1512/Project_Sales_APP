const userModel = require('../Model/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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
                    const token = jwt.sign({ IDUser: user.IDUser }, process.env.JWT_PASS);
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
