const cartModel = require('../Model/cart.model');
const Image = require('../Model/image.model');
const Cart = require('../Model/Sequelize_Model/Cart');
const Product = require('../Model/Sequelize_Model/PostSales');

class cartController {
    //GET /news
    async addProduct(req, response) {
        const idPost = req.body.idPost;
        const count = req.body.count;
        const idUser = req.IDUser;

        try {
            let checkExist = await Cart.findOne({
                where: {
                    IDUser: idUser,
                    IDPost: idPost,
                },
            });

            if (checkExist) {
                checkExist.set({ Count: checkExist.Count + count });
                await checkExist.save();
                return response.status(200).json({ result: true, message: 'Add product in cart successful' });
            } else {
                let newCart = await Cart.create({ IDPost: idPost, IDUser: idUser, Count: count });
                await newCart.save();
                return response.status(200).json({ result: true, message: 'Add one product in cart successful' });
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ result: false, message: 'server error' });
        }
    }

    async getAllProductInCart(req, response) {
        const idUser = req.IDUser;

        const products = await Cart.findAll({
            include: [{ model: Product, attributes: ['Title, Description'] }],
        });

        console.log(products);

        // cartModel
        //     .getCartByUser({ idUser })

        //     .then((result) => {
        //         var newResult = [];

        //         var total = 0;

        //         result.map((item) => {
        //             total += item.Count * item.Price * ((100 - item.Discount) / 100);
        //         });

        //         for (let i = 0; i < result.length; i++) {
        //             const element = result[i];
        //             Image.getImagesByPost({ idPost: element.IDPost })
        //                 .then((images) => {
        //                     images = images.map((image) => {
        //                         image.Path = `/uploads/images/${image.Path}`;
        //                         return image;
        //                     });
        //                     element.images = images;
        //                     return element;
        //                 })
        //                 .then((element) => {
        //                     newResult.push(element);
        //                 });
        //         }

        //         setTimeout(() => {
        //             return response.status(200).json({ result: true, data: newResult, total: total });
        //         }, 500);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         response.status(500).json({ result: false, message: 'server error' });
        //     });
    }

    updateCountProduct(req, response) {
        const idCart = Number(req.query.id_cart);
        const count = Number(req.query.count);
        const idUser = req.IDUser;

        cartModel
            .updateCountProduct({ idCart, count, idUser })
            .then((res) => {
                console.log(res);
                if (res.changedRows > 0) {
                    response.status(200).json({ result: true, message: 'Update count product successful' });
                } else {
                    response.status(200).json({ result: false, message: 'Update count product unsuccessful' });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Update count product unsuccessful' });
            });
    }

    deleteProduct(req, response) {
        const idCart = req.query.id_cart;
        cartModel
            .deleteProduct({ idCart: idCart })
            .then((res) => {
                response.status(200).json({ result: true, message: 'Delete product in cart successful' });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Delete product in cart unsuccessful' });
            });
    }

    deleteAllProduct(req, response) {
        const idUser = req.IDUser;

        cartModel
            .deleteAllProduct({ idUser })
            .then((res) => {
                console.log(res);
                response.status(200).json({
                    result: true,
                    message: `Delete All product in cart of user: ${idUser} successful`,
                });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({
                    result: false,
                    message: `Delete All product in cart of user: ${idUser} unsuccessful`,
                });
            });
    }
}
module.exports = new cartController();
