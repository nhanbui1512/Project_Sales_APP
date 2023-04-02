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
            `SELECT comment.IDComment, comment.IDUser, comment.CreateAt, comment.UpdateAt, comment.Content, user.UserName FROM comment INNER JOIN user ON comment.IDUser = user.IDUser WHERE PostID = ${IDPost}`,
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
Comment.create_cmt = ({ IDPost, IDUser, content }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO comment (IDUser, CreateAt, UpdateAt, Content ,PostID) VALUES (${IDUser}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${content}' , ${IDPost})`,
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
Comment.update_cmt = ({ IDComment, content }) => {
    return new Promise((resolve, reject) => {
        var now = new Date();
        const nowStr = `${now.getFullYear()}-${
            now.getMonth() + 1
        }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds}`;
        db.query(
            `UPDATE comment SET UpdateAt = CURRENT_TIMESTAMP, Content = '${content}' WHERE IDComment = ${IDComment}`,
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
Comment.delete_cmt = ({ IDComment }) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM comment WHERE IDComment = ${IDComment}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};
Comment.getInformation = ({ IDComment }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT comment.IDComment, comment.IDUser, comment.CreateAt, comment.UpdateAt, comment.Content, user.UserName FROM comment INNER JOIN user ON comment.IDUser = user.IDUser WHERE IDComment = ${IDComment}`,
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
