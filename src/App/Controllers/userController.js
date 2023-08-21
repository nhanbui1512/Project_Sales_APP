const requestAccessModel = require('../Model/request.model');
const StorageAvatar = require('../Services/FileStorage');

const { User, Access, Product } = require('../Model/Sequelize_Model');

const { Sequelize } = require('sequelize');

class userController {
    //GET all user
    async GetAll(req, response) {
        try {
            const currentPage = req.query.page || 1;
            const itemsPerPage = 5; // Số bản ghi trên mỗi trang

            const offset = (currentPage - 1) * itemsPerPage; // Tính OFFSET
            var result = await User.findAll({
                attributes: {
                    exclude: ['accessAccessId', 'password'],
                },
                include: { model: Access },
                limit: itemsPerPage,
                offset: offset,
            });

            response.status(200).json({ data: result });
        } catch (error) {
            response.status(500).json({ message: 'Server is error' });
        }
    }

    // get user by id
    async FindByID(req, response) {
        const ID = req.query.id;
        try {
            var user = await User.findByPk(ID, {
                attributes: {
                    exclude: ['accessAccessId', 'password'],
                },
                include: {
                    model: Access,
                },
            });

            if (user == null) {
                return response.status(200).json({ message: 'not found user' });
            }

            return response.status(200).json({ data: user });
        } catch (error) {
            console.log(error);
            return response.status(204).json({ data: [] });
        }
    }

    // get user  include name
    async FindInCludeName(req, response) {
        const userName = req.query.user_name;

        try {
            var users = await User.findAll({
                where: {
                    userName: {
                        [Sequelize.Op.like]: `%${userName}%`,
                    },
                },
                attributes: {
                    exclude: ['accessAccessId', 'password'],
                },
                include: {
                    model: Access,
                },
            });

            return response.status(200).json({ result: true, users: users });
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
                    userName: userName,
                },
            });

            return response.status(200).json({ data: users });
        } catch (error) {
            return response.status(501).json({ message: 'Server is error', data: [] });
        }
    }

    // (admin)
    async CreateUser(req, response) {
        const user = req.body;

        try {
            const isExist = await User.findOne({
                where: {
                    email: user.email,
                },
            });

            if (isExist) {
                return response.status(200).json({ result: false, message: 'email is exist' });
            } else {
                const newUser = await User.create({
                    userName: user.user_name,
                    password: user.password,
                    email: user.email,
                    phoneNumber: user.phone_number,
                    accessAccessId: user.access,
                    avatar: 'default_avatar.jpg',
                });

                return response.status(200).json({ result: true, message: 'Create user is successful', user: newUser });
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: 'Create user is not successful' });
        }
    }

    // standard user
    async UpdateUser(req, response) {
        const infoUpdate = req.body;
        const id = req.IDUser;

        try {
            await User.update(
                {
                    userName: infoUpdate.UserName,
                    phoneNumber: infoUpdate.PhoneNumber,
                    updateAt: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                {
                    where: {
                        userId: id,
                    },
                },
            );

            return response.status(200).json({
                result: true,
                message: 'update user successful',
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: error.message });
        }
    }

    async ChangePassword(req, response) {
        const id = req.IDUser;
        const oldPassword = req.body.old_password;
        const newPassword = req.body.new_password;

        try {
            var user = await User.findOne({
                where: {
                    userId: id,
                    password: oldPassword,
                },
            });

            if (user) {
                user.set({ password: newPassword });
                await user.save();
                return response
                    .status(200)
                    .json({ result: true, message: 'change password successful', newPassword: newPassword });
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
                if (user.avatar != 'default_avatar.jpg') {
                    await StorageAvatar.DeleteAvatarFile({ fileName: user.avatar });

                    user.set({ avatar: file.filename });
                    await user.save();
                } else {
                    user.set({ avatar: file.filename });
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

    async getMyProfile(req, response) {
        const idUser = req.IDUser;

        try {
            var user = await User.findByPk(idUser, {
                attributes: {
                    exclude: ['password', 'accessAccessId'],
                },
                include: Access,
            });

            return response.status(200).json(user);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: 'server error' });
        }
    }

    async registerAccount(req, response) {
        const form = {
            userName: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phone_number,
        };

        try {
            let isExist = await User.findOne({
                where: {
                    email: form.email,
                },
            });

            if (isExist != null) {
                return response.status(200).json({ result: false, message: 'Email is exist' });
            } else {
                const access = await Access.findOne({
                    where: {
                        accessName: 'Standard User',
                    },
                });

                const newUser = await User.create({
                    userName: form.userName,
                    email: form.email,
                    password: form.password,
                    phoneNumber: form.phoneNumber,
                    accessAccessId: access.accessId,
                    avatar: 'default_avatar.jpg',
                });

                return response.status(200).json({ result: true, information: newUser });
            }
        } catch (error) {
            return response.status(500).json({ result: false, message: error.message });
        }
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

    async getAllSalesAccount(req, response) {
        try {
            const access = await Access.findOne({
                where: {
                    accessName: 'Business',
                },
            });

            if (access != null) {
                const salesAccounts = await User.findAll({
                    where: {
                        accessAccessId: access.accessId,
                    },
                    include: [{ model: Product }, { model: Access }],
                    attributes: {
                        exclude: ['accessAccessId', 'password'],
                    },
                });
                return response.status(200).json({ result: true, data: salesAccounts });
            } else {
                return response.status(200).json({ result: false, data: [] });
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: error.message });
        }
    }

    async getAllUserAccount(req, response) {
        try {
            const access = await Access.findOne({
                where: {
                    accessName: 'Standard User',
                },
            });

            if (access != null) {
                const salesAccounts = await User.findAll({
                    where: {
                        accessAccessId: access.accessId,
                    },
                    include: [{ model: Product }, { model: Access }],
                    attributes: {
                        exclude: ['accessAccessId', 'password'],
                    },
                });
                return response.status(200).json({ result: true, data: salesAccounts });
            } else {
                return response.status(200).json({ result: false, data: [] });
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: error.message });
        }
    }
}
module.exports = new userController();
