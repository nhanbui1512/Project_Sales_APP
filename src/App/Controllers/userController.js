const userModel = require('../Model/user.model');
const requestAccessModel = require('../Model/request.model');
const StorageAvatar = require('../Services/FileStorage');

class userController {
    //GET all user
    GetAll(req, response) {
        userModel.getAll((result) => {
            if (result != null) {
                var users = result.map((user) => {
                    user.AvatarPath = `/uploads/images/${user.AvatarPath}`;
                    return user;
                });

                response.status(200).json({ data: users });
            } else {
                response.send('khong co du lieu');
            }
        });
    }

    // get user by id
    FindByID(req, response) {
        const ID = req.query.id;
        userModel
            .findByID({ ID })
            .then((user) => {
                user[0].AvatarPath = `/uploads/images/${user[0].AvatarPath}`;
                return response.status(200).json(user[0]);
            })
            .catch((err) => {
                console.log(err);
                return response.status(204).json({ data: [] });
            });
    }

    // get user  include name
    FindInCludeName(req, response) {
        const userName = req.query.user_name;
        userModel.findIncludeName({ name: userName }, (result) => {
            return response.status(200).json({ data: result });
        });
    }

    // get user by name
    FindUserByUserName(req, response) {
        const userName = req.query.user_name;
        userModel
            .findByName({ userName: userName })
            .then((data) => {
                return response.status(200).json(data);
            })
            .catch((err) => {
                return response.status(501).json({ result: null });
            });
    }

    CreateUser(req, response) {
        const user = {
            userName: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phone_number,
            access: req.body.access,
        };

        userModel
            .findByName({ userName: user.userName })
            .then((users) => {
                if (users.length > 0) {
                    response.status(400).json({
                        result: false,
                        message: 'account already exists',
                    });
                } else {
                    userModel
                        .CreateUser({ user })
                        .then((res) => {
                            console.log(res);
                            response.status(200).json({
                                result: true,
                                message: 'Create account is successful',
                                userID: res.insertId,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            response.status(501).json({ result: false, message: 'Create account is unsuccessful' });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'server is error' });
            });
    }

    UpdateUser(req, response) {
        const user = req.body;
        const id = req.IDUser;
        userModel.UpdateUser({ user, id }, (result) => {
            return response.status(200).json({ result: result });
        });
    }

    ChangePassword(req, response) {
        const id = req.IDUser;
        const oldPassword = req.body.old_password;
        const newPassword = req.body.new_password;

        userModel
            .CheckPassword({ idUser: id, password: oldPassword })
            .then((res) => {
                if (res.result == true) {
                    userModel
                        .ChangePass({ id, newPassword })
                        .then((res) => {
                            if (res.changedRows > 0) {
                                response.status(200).json({ result: true, message: 'Update password is successful' });
                            } else {
                                response
                                    .status(400)
                                    .json({ result: false, message: 'Update password is unsuccessful' });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            response.status(500).json({ result: false, message: 'Server is error' });
                        });
                } else {
                    response.status(400).json({ result: false, message: 'old password is wrong' });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Server is error' });
            });
    }

    // Gửi đơn yêu cầu trở thành nhà bán hàng
    RegisterSales(req, response) {
        const form = {
            nameShop: req.body.nameShop,
            addressShop: req.body.addressShop,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        };

        const idUser = req.IDUser;

        requestAccessModel
            .FindRequestByIDUser({ IDUser: idUser })
            .then((users) => {
                if (users.length > 0) {
                    // đã tồn tại đơn yêu cầu
                    response.status(400).json({ result: false, message: 'Đã tồn tại đơn' });
                } else {
                    requestAccessModel
                        .AddRequest({
                            idUser: idUser,
                            nameShop: form.nameShop,
                            addressShop: form.addressShop,
                            email: form.email,
                            phoneNumber: form.phoneNumber,
                        })
                        .then((res) => {
                            response.status(200).json({ result: true, message: 'Add request is successful' });
                        })
                        .catch((err) => {
                            console.log(err);
                            response.status(500).json({ result: false, message: 'Add request is unsuccessful' });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Server is error' });
            });
    }

    // Duyệt đơn
    AcceptSalesAccount(req, response) {
        const idRequest = req.query.id_request;
        requestAccessModel
            .UpdateStatus({ IDRequest: idRequest })
            .then((res) => {
                if (res.changedRows == 0) {
                    response.status(200).json({ result: false, message: 'Update Request is unsuccessful' });
                } else {
                    response.status(200).json({ result: true, message: 'Update Request is successful' });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Server is error' });
            });
    }

    ChangeAvatar(req, response) {
        const file = req.file;
        const idUser = req.IDUser;

        userModel
            .findByID({ ID: idUser })
            .then((user) => {
                if (user[0].AvatarPath != 'default_avatar.jpg') {
                    StorageAvatar.DeleteAvatarFile({ fileName: user[0].AvatarPath })
                        .then((res) => {
                            userModel
                                .updatePathAvatar({ fileName: file.filename, userId: idUser })
                                .then((result) => {
                                    response.status(200).json({
                                        result: true,
                                        message: 'update avatar successful',
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    response.status(501).json({
                                        result: false,
                                        message: 'update avatar is unsuccessful',
                                    });
                                });
                        })
                        .catch((err) => {
                            response.status(501).json({ result: false, message: 'fail to delete old avatar' });
                        });
                } else {
                    userModel
                        .updatePathAvatar({ fileName: file.filename, userId: idUser })
                        .then((result) => {
                            response.status(200).json({ result: true, message: 'update avatar successful' });
                        })
                        .catch((err) => {
                            console.log(err);
                            response.status(501).json({
                                result: false,
                                message: 'update avatar is unsuccessful',
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(201).json({ result: false, message: 'not found user by user id ' });
            });
    }

    getMyProfile(req, response) {
        const idUser = req.IDUser;
        userModel
            .findByID({ ID: idUser })
            .then((res) => {
                response.status(200).json({ result: true, data: res[0] });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Server is error' });
            });
    }

    registerAccount(req, response) {
        const user = {
            userName: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phone_number,
            access: 1,
        };

        userModel
            .findByName({ userName: user.userName })
            .then((users) => {
                if (users.length > 0) {
                    response.status(400).json({ result: false, message: 'account already exists' });
                } else {
                    userModel
                        .CreateUser({ user })
                        .then((res) => {
                            response.status(200).json({
                                result: true,
                                message: 'register account successful',
                                userID: res.insertId,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            response.status(500).json({ result: false, message: 'register user is unsuccessful' });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'server is error' });
            });
    }

    getAllRequest(req, response) {
        requestAccessModel
            .GetAllRequest()
            .then((res) => {
                response.status(200).json({ data: res });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Server is error' });
            });
    }
}
module.exports = new userController();
