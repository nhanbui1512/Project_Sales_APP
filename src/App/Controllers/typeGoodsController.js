const typeModel = require('../Model/typegoods.model');
const { Category, Product } = require('../Model/Sequelize_Model');

class typeGoodsController {
    //GET /news
    async getAll(req, response) {
        try {
            const categories = await Category.findAll();
            return response.status(200).json({ categories });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: error.message });
        }
    }

    async addType(req, response) {
        const nameType = req.body.nameType;
        const icon = req.file;

        if (icon) {
            try {
                const newCategory = await Category.create({
                    categoryName: nameType,
                    icon: icon.filename,
                });

                return response.status(200).json({ result: true, newCategory: newCategory });
            } catch (error) {
                console.log(error);
                return response.status(500).json({ message: error.message });
            }
        } else {
            response.status(200).json({ result: false, message: 'file not attached' });
        }
    }

    async updateType(req, response) {
        const nameType = req.body.nameType;
        const idType = req.query.idType;

        try {
            await Category.update(
                {
                    categoryName: nameType,
                },
                {
                    where: {
                        categoryId: idType,
                    },
                },
            );

            return response.status(200).json({ result: true, message: 'updated category' });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: error.message });
        }
    }

    async changeIconType(req, response) {
        const file = req.file;
        const idType = req.query.idType;

        if (file && idType) {
            typeModel
                .updateIcon({ nameFile: file.filename, idType: idType })
                .then((res) => {
                    response.status(200).json({ result: true, message: 'update icon successful' });
                })
                .catch((err) => {
                    response.status(500).json({ result: true, message: 'update icon unsuccessful' });
                });
        } else {
            response.status(400).json({ result: false, message: 'file is not attached or not found idType' });
        }
    }

    async getByID(req, response) {
        const idType = req.query.id_type;
        try {
            const category = await Category.findByPk(idType);
            return response.status(200).json(category);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: error.message });
        }
    }
}
module.exports = new typeGoodsController();
