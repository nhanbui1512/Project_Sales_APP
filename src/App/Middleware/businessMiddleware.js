const { Op } = require('sequelize');
const { Access } = require('../Model/Sequelize_Model/index.js');
const businessMiddleWare = async (req, response, next) => {
    try {
        const acesses = await Access.findAll({
            where: {
                [Op.or]: [
                    {
                        accessName: 'admin',
                    },
                    {
                        accessName: 'Business',
                    },
                ],
            },
        });
        const access = req.access;

        if (access == acesses[0].accessId || access == acesses[1].accessId) {
            return next();
        }
        return response
            .status(200)
            .json({ result: false, message: 'This API have to has business or admin authentication ' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = businessMiddleWare;
