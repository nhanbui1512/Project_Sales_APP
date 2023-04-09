const userModel = require('../Model/user.model');
const requestAccess = require('../Model/request.model');
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
                // for (let i = 0; i < result.length; i++) {
                //     result[i].AvatarPath = `/uploads/images/${result[i].AvatarPath}`;
                //     if (i == result.length - 1) {
                //         response.status(200).json({ data: result });
                //     }
                // }
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
        const user = req.body;
        userModel.CreateUser({ user: user }, (result) => {
            return response.status(200).json({ result: result });
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
        const id = req.query.id;
        const newPassword = req.body.password;

        userModel.ChangePass({ id: id, newPassword: newPassword }, (result) => {
            return response.status(200).json(result);
        });
    }
    RegisterSales(req, response) {
        const id = req.IDUser;
        console.log(id);
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
}
module.exports = new userController();
