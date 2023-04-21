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
    db.query('SELECT IDUser,UserName,Email,PhoneNumber,AvatarPath,Access FROM user', (err, users) => {
        if (!err) {
            result(users);
        } else {
            result(null);
        }
    });
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

User.CreateUser = ({ user }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO user (UserName, Email, PhoneNumber,AvatarPath, Access,PassWord) 
            VALUES('${user.userName}','${user.email}','${user.phoneNumber}','default_avatar.jpg', ${user.access}, '${user.password}')
            `,
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

User.ChangePass = ({ id, newPassword }) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE user SET Password = '${newPassword}' WHERE IDUser = ${id}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

User.checkLogin = ({ userName, password }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user WHERE UserName = '${userName}' AND Password = '${password}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
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
        db.query(`UPDATE user SET AvatarPath = '${fileName}' WHERE IDUser = ${userId}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

User.CheckPassword = ({ idUser, password }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user WHERE IDUser = ${idUser} AND Password = '${password}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res.length > 0) {
                    resolve({ result: true });
                } else {
                    resolve({ result: false });
                }
            }
        });
    });
};

module.exports = User;
