const { Access } = require('../Model/Sequelize_Model');

const accessAdmin = async (req, response, next) => {
    const access = req.access;

    try {
        const admin = await Access.findOne({
            where: {
                accessName: 'admin',
            },
        });

        if (access == admin.accessId) {
            next();
        } else {
            response.status(200).json({ result: false, message: 'API cần đăng nhập vào quyền admin' });
            return;
        }
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};
module.exports = accessAdmin;
