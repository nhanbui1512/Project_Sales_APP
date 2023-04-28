const cartModel = require('../Model/cart.model');
const Image = require('../Model/image.model');

class cartController {
    //GET /news
    addProduct(req, response) {
        const idPost = req.body.idPost;
        const count = req.body.count;
        const idUser = req.IDUser;

        // Chưa xong
        cartModel
            .checksValidProduct({ idPost: idPost, idUser: idUser })
            .then((res) => {
                if (res == false) {
                    // nếu chưa tồn tại sản phẩm trong giỏ hàng
                    cartModel
                        .addProduct({ idPost, count, idUser })
                        .then((res) => {
                            response.status(200).json({
                                result: true,
                                message: 'Insert product to cart successful',
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            response.status(500).json({
                                result: false,
                                message: 'Insert product to cart not successful',
                            });
                        });
                } else {
                    const idCart = res[0].IDCart;
                    var oldCount = res[0].Count;
                    var newCount = oldCount + count;
                    cartModel
                        .updateCountProduct({ idCart, count: newCount, idUser })
                        .then((res) => {
                            response.status(200).json({
                                result: true,
                                message: 'Insert product to cart successful',
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            response.status(500).json({
                                result: false,
                                message: 'Insert product to cart unsuccessful',
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'add Product into cart fail' });
            });
    }

    getAllProductInCart(req, response) {
        const idUser = req.IDUser;
        cartModel
            .getCartByUser({ idUser })

            .then((result) => {
                var newResult = [];

                var total = 0;

                result.map((item) => {
                    total += item.Count * item.Price * ((100 - item.Discount) / 100);
                });

                for (let i = 0; i < result.length; i++) {
                    const element = result[i];
                    Image.getImagesByPost({ idPost: element.IDPost })
                        .then((images) => {
                            images = images.map((image) => {
                                image.Path = `/uploads/images/${image.Path}`;
                                return image;
                            });
                            element.images = images;
                            return element;
                        })
                        .then((element) => {
                            newResult.push(element);
                        });
                }

                setTimeout(() => {
                    return response.status(200).json({ result: true, data: newResult, total: total });
                }, 500);
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'server error' });
            });
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
