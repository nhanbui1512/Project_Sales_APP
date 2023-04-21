const db = require('../../Config/Db');

const cart = function (cart) {
    this.IDCart = cart.IDCart;
    this.IDUser = cart.IDUser;
    this.Count = cart.Count;
    this.IDPost = cart.IDPost;
};

cart.addProduct = ({ idUser, count, idPost }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO cart (IDPost,Count,IDUser) VALUES (${idPost},${count},${idUser})`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

cart.getCartByUser = ({ idUser }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT cart.IDCart, cart.Count, postsales.IDPost, postsales.Title, postsales.Description, postsales.Price, postsales.Discount FROM cart JOIN postsales ON cart.IDPost = postsales.IDPost WHERE cart.IDUser = ${idUser}`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            },
        );
    });
};

cart.checksValidProduct = ({ idUser, idPost }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cart WHERE IDUser = ${idUser} and IDPost=${idPost}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res.length > 0) {
                    resolve(res);
                } else {
                    resolve(false);
                }
            }
        });
    });
};

cart.updateCountProduct = ({ idCart, count, idUser }) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE cart SET Count = ${count} WHERE IDCart = ${idCart} AND IDUser = ${idUser}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

cart.deleteProduct = ({ idCart }) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM cart WHERE IDCart=${idCart}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

cart.deleteAllProduct = ({ idUser }) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM cart WHERE IDUser=${idUser}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = cart;
