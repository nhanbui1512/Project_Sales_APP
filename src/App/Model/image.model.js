const db = require('../../Config/Db');

const Image = function (image) {
    this.idImage = image.IDImage;
    this.path = image.path;
    this.postID = image.postID;
};

Image.CreateImage = ({ fileName, postID }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO image (Path, PostID) VALUES ('${fileName}',${postID})`,
            (res, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            },
        );
    });
};

Image.CreateMultiImage = ({ files, postID }) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < files.length; i++) {
            const element = files[i].filename;
            db.query(
                `INSERT INTO image (Path, PostID) VALUES ('${element}',${postID})`,
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                },
            );
        }
        resolve(true);
    });
};

Image.DeleteImagesByPostID = ({ postID }) => {
    return new Promise((resolve, reject) => {
        db.query(`delete from image where PostID = ${postID}`, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
};

module.exports = Image;
