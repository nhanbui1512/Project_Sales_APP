const userModel = require('../Model/user.model');
const requestAccess = require('../Model/request.model');
const StorageAvatar = require('../Services/FileStorage');
const User = require('../Model/user.model');

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
                return response.status(200).json({ data: user });
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

        User.findByName({ userName: user.userName })
            .then((users) => {
                if (users.length > 0) {
                    response.status(400).json({
                        result: false,
                        message: 'account already exists',
                    });
                } else {
                    User.CreateUser({ user })
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
                            response
                                .status(501)
                                .json({ result: false, message: 'Create account is unsuccessful' });
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
        const id = req.query.id;
        userModel.UpdateUser({ user, id }, (result) => {
            return response.status(200).json({ result: result });
        });
    }

    ChangePassword(req, response) {
        const id = req.IDUser;
        const newPassword = req.body.password;

        userModel
            .ChangePass({ id, newPassword })
            .then((res) => {
                if (res.changedRows == 1) {
                    response
                        .status(200)
                        .json({ result: true, message: 'Change password is successful' });
                } else {
                    response.status(400).json({
                        result: false,
                        message: 'The new password is the same as the old password',
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'server is error' });
            });
    }

    RegisterSales(req, response) {
        const id = req.IDUser;
        requestAccess.findbyiduser({ id: id }).then((result) => {
            if (result.length > 0) {
                return response.status(501).json('Đã đăng kí');
            } else {
                requestAccess
                    .registerSales({ id: id })
                    .then((result) => {
                        return response.status(200).json('Đăng kí thành công');
                    })
                    .catch((err) => {
                        return response.status(501).json(err);
                    });
            }
        });
    }
    RequestAccess(req, response) {
        let id_user = req.params.iduser;

        let accuser = req.access;
        if (accuser != 0) {
            return response.status(501).json('Không có quyền');
        } else {
            requestAccess
                .updateAccess(id_user)
                .then((result) => {
                    userModel.updateAccess({ id: id_user });
                    return response.status(200).json('Cấp quyền thành công');
                })
                .catch((err) => {
                    return response.status(501).json(err);
                });
        }
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
                            response
                                .status(501)
                                .json({ result: false, message: 'fail to delete old avatar' });
                        });
                } else {
                    userModel
                        .updatePathAvatar({ fileName: file.filename, userId: idUser })
                        .then((result) => {
                            response
                                .status(200)
                                .json({ result: true, message: 'update avatar successful' });
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
        User.findByID({ ID: idUser })
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

        User.findByName({ userName: user.userName })
            .then((users) => {
                if (users.length > 0) {
                    response.status(400).json({ result: false, message: 'account already exists' });
                } else {
                    User.CreateUser({ user })
                        .then((res) => {
                            response.status(200).json({
                                result: true,
                                message: 'register account successful',
                                userID: res.insertId,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            response
                                .status(500)
                                .json({ result: false, message: 'register user is unsuccessful' });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'server is error' });
            });
    }
}
module.exports = new userController();
