const userModel = require('../Model/user.model');
const requestAccessModel = require('../Model/request.model');
const StorageAvatar = require('../Services/FileStorage');
// const User = require('../Model/user.model');

const User = require('../Model/Sequelize_Model/User');
const { Sequelize } = require('sequelize');
const { default: retryAsPromised } = require('retry-as-promised');

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

                return response.status(200).json({ result: true, message: 'Create user is successful' });
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: 'Create user is not successful' });
        }
    }

    async UpdateUser(req, response) {
        const infoUpdate = req.body;
        const id = req.IDUser;

        try {
            let user = await User.findByPk(id);

            user.set({
                Email: infoUpdate.email,
                PhoneNumber: infoUpdate.phone_number,
            });

            await user.save();

            return response.status(200).json({ result: true, message: 'update user successful' });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: 'server is error' });
        }
    }

    async ChangePassword(req, response) {
        const id = req.IDUser;
        const oldPassword = req.body.old_password;
        const newPassword = req.body.new_password;

        try {
            var user = await User.findOne({
                where: {
                    IDUser: id,
                    Password: oldPassword,
                },
            });

            if (user) {
                user.set({ Password: newPassword });
                await user.save();
                return response.status(200).json({ result: true, message: 'change password successful' });
            } else {
                response.status(200).json({ result: false, message: 'old password wrong' });
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: 'Server error' });
        }
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
                    User.updateAccess({ id: idUser })
                        .then((data) => {
                            response.status(200).json({ result: true, message: 'Update Request is successful' });
                        })
                        .catch((err) => {});
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Server is error' });
            });
    }

    async ChangeAvatar(req, response) {
        const file = req.file;
        const idUser = req.IDUser;

        try {
            var user = await User.findByPk(idUser);
            if (user) {
                if (user.AvatarPath != 'default_avatar.jpg') {
                    let res = await StorageAvatar.DeleteAvatarFile({ fileName: user.AvatarPath });
                    console.log(res);
                    user.set({ AvatarPath: file.filename });
                    await user.save();
                } else {
                    user.set({ AvatarPath: file.filename });
                    await user.save();
                }
                return response.status(200).json({ result: true, message: 'update avatar successful' });
            } else {
                return response.status(200).json({ result: false, message: 'not found user' });
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: 'server error' });
        }
    }

    getMyProfile(req, response) {
        const idUser = req.IDUser;
        userModel
            .findByID({ ID: idUser })
            .then((res) => {
                res[0].AvatarPath = `/uploads/images/${res[0].AvatarPath}`;
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
                            const idUser = res.insertId;

                            return idUser;
                        })
                        .then((idUser) => {
                            userModel
                                .findByID({ ID: idUser })
                                .then((user) => {
                                    response.status(200).json({
                                        result: true,
                                        message: 'register account successful',
                                        user: user[0],
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    response.status(500).json({ result: false, message: 'server is error' });
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

    getAllSalesAccount(req, response) {
        userModel
            .getAllSalesAccount()
            .then((result) => {
                var users = result.map((user) => {
                    user.AvatarPath = `/uploads/images/${user.AvatarPath}`;
                    return user;
                });

                response.status(200).json({ result: true, data: users });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'server is error' });
            });
    }

    getAllUserAccount(req, response) {
        userModel
            .getAllUserAccount()
            .then((result) => {
                var users = result.map((user) => {
                    user.AvatarPath = `/uploads/images/${user.AvatarPath}`;
                    return user;
                });

                response.status(200).json({ result: true, data: users });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'server is error' });
            });
    }
}
module.exports = new userController();
