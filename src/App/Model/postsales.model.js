const db = require('../../Config/Db');

const PostSales = function (post) {
    this.IDPost = post.IDPost;
    this.Titile = post.Titile;
    this.Description = post.Description;
    this.CreateAt = post.CreateAt;
    this.UpdateAt = post.UpdateAt;
    this.IDUser = post.IDUser;
    this.IDType = post.IDType;
};

PostSales.GetAll = (result) => {
    db.query(
        'SELECT IDPost,postsales.IDUser, user.UserName ,Title,Price,Discount ,Description,CreateAt,UpdateAt, typegoods.NameType FROM postsales, user, typegoods WHERE postsales.IDUser = user.IDUser AND postsales.IDType = typegoods.IDType ORDER BY CreateAt DESC',
        (err, res) => {
            if (err) {
                console.log(err);
                result(null);
            } else {
                result(res);
            }
        },
    );
};

PostSales.Find = ({ id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT IDPost,postsales.IDUser, user.UserName ,Title, Price,Discount, Description,CreateAt,UpdateAt, typegoods.NameType FROM postsales, user, typegoods WHERE postsales.IDUser = user.IDUser AND postsales.IDType = typegoods.IDType AND postsales.IDPost = ${id} `,
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

PostSales.Create = ({ post }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO postsales (Title, Description,Price,Discount, CreateAt, UpdateAt,IDUser, IDType, Price, Discount) VALUES (
            '${post.title}', '${post.description}',${post.price},${post.discount}, CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP , ${post.id_user} , ${post.id_type}, ${post.price} ,${post.discount})`,
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

PostSales.Update = ({ post, idUser }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE postsales SET Title = ${post.title}, Description = ${post.description}, UpdateAt = CURRENT_TIMESTAMP, Price = ${post.price}, Discount = '${post.discount}' WHERE IDPost = ${post.idPost} and IDUser = ${idUser}`,
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

PostSales.Delete = ({ postID }) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM postsales WHERE IDPost = ${postID}`, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
};

PostSales.getRand = ({ randNumber }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT IDPost,postsales.IDUser, user.UserName ,Title, Description,CreateAt,UpdateAt, typegoods.NameType FROM postsales, user, typegoods WHERE postsales.IDUser = user.IDUser AND postsales.IDType = typegoods.IDType ORDER BY RAND() LIMIT ${randNumber}`,
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

PostSales.getByTypeID = ({ IDType }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT IDPost,postsales.IDUser, user.UserName ,Title, Description,CreateAt,UpdateAt, typegoods.NameType FROM postsales, user, typegoods WHERE postsales.IDUser = user.IDUser AND postsales.IDType = typegoods.IDType AND postsales.IDType = ${IDType} ORDER BY CreateAt DESC`,
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

module.exports = PostSales;
