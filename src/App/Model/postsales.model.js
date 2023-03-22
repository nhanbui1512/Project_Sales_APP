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
        'SELECT IDPost,postsales.IDUser, user.UserName ,Title, Description,CreateAt,UpdateAt, typegoods.NameType FROM postsales, user, typegoods WHERE postsales.IDUser = user.IDUser AND postsales.IDType = typegoods.IDType',
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

PostSales.Create = ({ post }) => {
    return new Promise((resolve, reject) => {
        var now = new Date();
        const nowStr = `${now.getFullYear()}-${
            now.getMonth() + 1
        }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        db.query(
            `INSERT INTO postsales (Title, Description, CreateAt, UpdateAt,IDUser, IDType) VALUES (
            '${post.title}', '${post.description}','${nowStr}','${nowStr}' , ${post.id_user} , ${post.id_type})`,
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

PostSales.Find = ({ id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT IDPost,postsales.IDUser, user.UserName ,Title, Description,CreateAt,UpdateAt, typegoods.NameType FROM postsales, user, typegoods WHERE postsales.IDUser = user.IDUser AND postsales.IDType = typegoods.IDType AND postsales.IDPost = ${id} `,
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

module.exports = PostSales;
