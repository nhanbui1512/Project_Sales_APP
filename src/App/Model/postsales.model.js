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
    db.query('SELECT * FROM postsales', (err, res) => {
        if (err) {
            console.log(err);
            result(null);
        } else {
            result(res);
        }
    });
};

PostSales.Create = ({ post }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO postsales (Title, Description, CreateAt, UpdateAt,IDUser, IDType) VALUES (
            '${post.title}', '${post.description}',${Date.now()},${Date.now()} , ${post.id_user} , ${post.id_type})`,
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
