const userModel = require('../Model/user.model');
class userController {
    //GET all user
    GetAll(req, res) {
        userModel.getAll((result) => {
            if (result != null) {
                res.status(200).json({ data: result });
            } else {
                res.send('khong co du lieu');
            }
        });
    }

    // get user by id
    FindByID(req, response) {
        const ID = req.query.id;
        userModel.findByID(ID, (res) => {
            response.status(200).json({ data: res });
        });
    }

    // get user  include name
    FindInCludeName(req, response) {
        const userName = req.query.user_name;
        userModel.findIncludeName({ name: userName }, (result) => {
            response.status(200).json({ data: result });
        });
    }

    // get user by name
    FindUserByUserName(req, response) {
        const userName = req.query.user_name;
        userModel
            .findByName({ userName: userName })
            .then((data) => {
                response.status(200).json(data);
            })
            .catch((err) => {
                response.status(501).json({ result: null });
            });
    }

    CreateUser(req, response) {
        const user = req.body;
        userModel.CreateUser(user, (result) => {
            if (result) {
                response.status(200).json({ result: true });
            } else {
                response.status(200).json({ result: false });
            }
        });
    }

    UpdateUser(req, response) {
        const user = req.body;
        const id = req.query.id;
        userModel.UpdateUser({ user, id }, (result) => {
            response.status(200).json({ result: result });
        });
    }

    ChangePassword(req, response) {
        const id = req.query.id;
        const newPassord = req.body.password;

        userModel.ChangePass({ id: id, newPassword: newPassord }, (result) => {
            response.status(200).json(result);
        });
    }
}
module.exports = new userController();
