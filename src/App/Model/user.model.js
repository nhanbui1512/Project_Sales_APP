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
                result(null);
            }
        },
    );
};

User.findByID = (ID, result) => {
    db.query(
        `SELECT IDUser,UserName,Email,PhoneNumber,AvatarPath,Access FROM user WHERE IDUser = ${ID}`,
        (err, user) => {
            if (err) {
                result(null);
            } else {
                result(user);
            }
        },
    );
};

User.findByName = (name, result) => {
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

User.CreateUser = (user, result) => {
    db.query(
        `INSERT INTO user (UserName, Email, PhoneNumber,AvatarPath, Access,PassWord) 
        VALUES('${user.user_name}','${user.email}','${user.phone_number}','${user.avatar_path}', ${user.access}, '${user.password}')
        `,
        (err) => {
            if (err) {
                result(false);
            } else {
                result(true);
            }
        },
    );
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

module.exports = User;