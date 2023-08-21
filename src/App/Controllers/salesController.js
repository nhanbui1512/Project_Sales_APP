const { Sequelize, Op } = require('sequelize');

const { Product, User, Image, Category, sequelize } = require('../Model/Sequelize_Model');

class salesController {
    //GET all sales post
    async GetAll(req, response) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['accessAccessId'],
                        },
                    },
                    {
                        model: Category,
                        attributes: {
                            exclude: ['categoryId'],
                        },
                    },
                    {
                        model: Image,
                        attributes: {
                            exclude: ['productProductId'],
                        },
                    },
                ],
            });

            return response.status(200).json({ products });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: error.message });
        }
    }

    // Find a post by id
    async FindByID(req, response) {
        const id = req.query.id;
        try {
            const product = await Product.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['accessAccessId'],
                        },
                    },
                    {
                        model: Category,
                        attributes: {
                            exclude: ['categoryId'],
                        },
                    },
                ],
            });
            return response.status(200).json({ result: true, data: product });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: error.message });
        }
    }

    // Add a post
    async CreatePostSales(req, response) {
        const files = req.files;

        const post = {
            id_user: req.IDUser,
            title: req.body.title,
            description: req.body.description,
            id_type: req.body.id_type,
            price: req.body.price,
            discount: req.body.discount,
        };

        try {
            const category = await Category.findByPk(post.id_type);
            if (category != null) {
                const product = await Product.create({
                    title: post.title,
                    description: post.description,
                    price: post.price,
                    discount: post.discount,
                    userUserId: post.id_user,
                });
                product.setCategory(category);
                await product.save();

                files.map(async (file) => {
                    await Image.create({
                        path: file.filename,
                        productProductId: product.productId,
                    });
                });

                return response.status(200).json({ result: true, message: 'Created a product and images' });
            } else {
                return response.status(200).json({ result: false, message: 'Not found category' });
            }
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async UpdatePost(req, response) {
        const idUser = req.IDUser;

        const post = {
            idPost: req.body.idPost,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
        };

        try {
            const product = await Product.findOne({
                productId: post.idPost,
                userUserId: idUser,
            });

            if (product != null) {
                product.title = post.title;
                product.description = post.description;
                product.price = post.price;
                product.discount = post.discount;
                product.updateAt = Sequelize.literal('CURRENT_TIMESTAMP');
                const result = await product.save();

                return response.status(200).json({ result: true, message: 'updated product', result });
            } else {
                return response.status(200).json({ result: false, message: 'not found product' });
            }
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    // Delete a post
    async DelPost(req, response) {
        const postID = req.query.id_post;
        const userId = req.IDUser;

        try {
            const product = await Product.findOne({
                where: {
                    productId: postID,
                    userUserId: userId,
                },
            });

            if (product != null) {
                await product.destroy();
                return response.status(200).json({ result: true, message: 'deleted product' });
            } else {
                return response.status(200).json({ result: false, message: 'not found product' });
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: error.message });
        }
    }

    async GetRand(req, response) {
        const count = req.query.count;
        try {
            const products = await Product.findAll({
                order: sequelize.random(),
                limit: Number(count),
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password'],
                        },
                    },
                    {
                        model: Image,
                        attributes: {
                            exclude: ['productProductId'],
                        },
                    },
                ],
            });

            return response.status(200).json(products);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async FindPostsByTypeID(req, response) {
        const idType = req.query.id_type;

        try {
            const category = await Category.findByPk(idType, {
                include: [
                    {
                        model: Product,
                        include: [
                            {
                                model: Image,
                            },
                        ],
                        attributes: {
                            exclude: ['categoryCategoryId'],
                        },
                        order: [['CreateAt', 'DESC']],
                    },
                ],
            });

            return response.status(200).json({ category });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: error.message });
        }
    }

    async FindIncludeName(req, response) {
        const name = req.query.name;
        try {
            const products = await Product.findAll({
                where: {
                    title: {
                        [Sequelize.Op.like]: `%${name}%`,
                    },
                },
                order: [['CreateAt', 'DESC']],
                include: [
                    {
                        model: Image,
                    },
                    {
                        model: User,
                        attributes: {
                            exclude: ['password', 'accessAccessId'],
                        },
                    },
                ],
                attributes: {
                    exclude: ['userUserId'],
                },
            });

            return response.status(200).json({ products });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: error.message });
        }
    }
}
module.exports = new salesController();
