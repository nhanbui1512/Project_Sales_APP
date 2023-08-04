const userModel = require('../Model/user.model');
const requestAccess = require('../Model/request.model');
const StorageAvatar = require('../Services/FileStorage');

const User = require('../Model/Sequelize_Model/User');
const { Sequelize } = require('sequelize');

class userController {
    //GET all user
    async GetAll(req, response) {
        try {
            var result = await User.findAll();
            var users = result.map((user) => {
                user.AvatarPath = `/uploads/images/${user.AvatarPath}`;
                return user;
            });
            response.status(200).json({ data: users });
        } catch (error) {
            response.status(500).json({ message: 'Server is error' });
        }
    }

    // get user by id
    async FindByID(req, response) {
        const ID = req.query.id;
        try {
            // const user = await User.findOne({
            //     where: {
            //         IDUser: ID,
            //     },
            // });

            // hoac la

            const user = await User.findByPk(ID);
            return response.status(200).json({ data: user });
        } catch (error) {
            console.log(err);
            return response.status(204).json({ data: [] });
        }
    }

    // get user  include name
    async FindInCludeName(req, response) {
        const userName = req.query.user_name;

        try {
            const users = await User.findAll({
                where: {
                    UserName: {
                        [Sequelize.Op.like]: `%${userName}%`,
                    },
                },
            });

            return response.status(200).json({ data: users });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: 'server is error' });
        }
    }

    // get user by name
    async FindUserByUserName(req, response) {
        const userName = req.query.user_name;

        try {
            const users = await User.findAll({
                where: {
                    UserName: userName,
                },
            });

            return response.status(200).json({ data: users });
        } catch (error) {
            return response.status(501).json({ message: 'Server is error', data: [] });
        }
    }

    async CreateUser(req, response) {
        const user = req.body;

        try {
            const isExist = await User.findOne({
                where: {
                    UserName: user.user_name,
                },
            });

            if (isExist) {
                return response.status(200).json({ result: false, message: 'username is exist' });
            } else {
                const newUser = await User.create({
                    UserName: user.user_name,
                    Password: user.password,
                    Email: user.email,
                    PhoneNumber: user.phone_number,
                    Access: user.access,
                });

                await newUser.save();

                return response
                    .status(200)
                    .json({ result: true, message: 'Create user is successful' });
            }
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .json({ result: false, message: 'Create user is not successful' });
        }
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
}
module.exports = new userController();
