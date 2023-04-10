const cartModel = require('../Model/cart.model');

class cartController {
    //GET /news
    addProduct(req, response) {
        const idPost = req.body.idPost;
        const count = req.body.count;
        const idUser = req.IDUser;

        // Chưa xong
        cartModel
            .checksValidProduct({ idPost, idUser })
            .then((res) => {
                if (res == true) {
                }
                cartModel
                    .addProduct({ idPost, count, idUser })
                    .then((res) => {
                        response
                            .status(200)
                            .json({ result: true, message: 'Insert product to cart successful' });
                    })
                    .catch((err) => {
                        console.log(err);
                        response.status(500).json({
                            result: false,
                            message: 'Insert product to cart not successful',
                        });
                    });
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

            .then((res) => {
                response.status(200).json({ res });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'server error' });
            });
    }

    deleteProduct(req, response) {}
}
module.exports = new cartController();
