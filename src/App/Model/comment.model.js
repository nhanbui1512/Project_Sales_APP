const db = require('../../Config/Db');

const Comment = function (comment) {
    this.IDComment = comment.IDComment;
    this.IDUser = comment.IDUser;
    this.UserName = comment.UserName;
    this.CreateAt = comment.CreateAt;
    this.UpdateAt = comment.UpdateAt;
    this.Content = comment.Content;
};

Comment.FindByPost = ({ IDPost }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT postsales.IDPost, comment.IDComment, user.IDUser, user.UserName, comment.Content
        FROM comment 
        INNER JOIN post_comment
            ON comment.IDComment = post_comment.IDComment
        INNER JOIN postsales
            ON postsales.IDPost = post_comment.IDPost AND postsales.IDPost = ${IDPost}
        INNER JOIN user
            ON user.IDUser = comment.IDUser`,
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

module.exports = Comment;
