const db = require('../../Config/Db');

const User = function (user) {
    this.IDUser = user.IDUser;
    this.UserName = user.UserName;
    this.Email = user.Email;
    this.PhoneNumber = user.PhoneNumber;
    this.AvatarPath = user.AvatarPath;
    this.Access = user.Access;
    this.Password = user.PassWord;
};

User.getAll = (result) => {
    db.query(
        'SELECT IDUser,UserName,Email,PhoneNumber,AvatarPath,Access FROM user',
        (err, users) => {
            if (!err) {
                result(users);
            } else {
                console.log(err);
                result(null);
            }
        },
    );
};

User.findByID = ({ ID }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT IDUser,UserName,Email,PhoneNumber,AvatarPath,Access FROM user WHERE IDUser = ${ID}`,
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

User.findByName = ({ userName }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT IDUser,UserName,Email,PhoneNumber,AvatarPath,Access FROM user WHERE UserName = '${userName}'`,
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            },
        );
    });
};

// find include name
User.findIncludeName = ({ name }, result) => {
    db.query(
        `SELECT IDUser,UserName,Email,PhoneNumber,AvatarPath,Access FROM user WHERE UserName LIKE '%${name}%'`,
        (err, user) => {
            if (err) {
                console.log(err);
                result(null);
            } else {
                result(user);
            }
        },
    );
};

User.CreateUser = ({ user }, result) => {
    db.query(`SELECT * FROM user WHERE UserName = '${user.user_name}'`, (res) => {
        if (res != null) {
            db.query(
                `INSERT INTO user (UserName, Email, PhoneNumber,AvatarPath, Access,PassWord) 
                VALUES('${user.user_name}','${user.email}','${user.phone_number}','default_avatar.jpg', ${user.access}, '${user.password}')
                `,
                (err) => {
                    if (err) {
                        result(false);
                    } else {
                        console.log('create successful');
                        result(true);
                    }
                },
            );
        } else {
            result(false);
        }
    });
};

User.UpdateUser = ({ user, id }, result) => {
    db.query(
        `UPDATE user SET UserName = '${user.user_name}', Email = '${user.email}', PhoneNumber = '${user.phone_number}'
        WHERE IDUser = ${id}`,
        (err) => {
            if (err) {
                result(false);
            } else {
                result(true);
            }
        },
    );
};

User.ChangePass = ({ id, newPassword }, result) => {
    db.query(`UPDATE user SET Password = '${newPassword}' WHERE IDUser = ${id}`, (err) => {
        if (err) {
            console.log(err);
            result(false);
        } else {
            result(true);
        }
    });
};

User.checkLogin = ({ userName, password }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM user WHERE UserName = '${userName}' AND Password = '${password}'`,
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

User.updateAccess = ({ id }) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE user SET Access = 2 WHERE IDUser = ${id}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

User.updatePathAvatar = ({ fileName, userId }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE user SET AvatarPath = '${fileName}' WHERE IDUser = ${userId}`,
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

module.exports = User;
