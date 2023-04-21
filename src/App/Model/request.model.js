const db = require('../../Config/Db');

const accessrequest = function (accessrequest) {
    this.IDUser = accessrequest.IDUser;
    this.IDRequest = accessrequest.IDRequest;
    this.NameShop = accessrequest.NameShop;
    this.AddressShop = accessrequest.AddressShop;
    this.Email = accessrequest.Email;
    this.PhoneNumber = accessrequest.PhoneNumber;
    this.Status = accessrequest.Status;
    this.CreateAt = accessrequest.CreateAt;
};

accessrequest.GetAllRequest = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM accessrequest WHERE Status = false ORDER BY CreateAt DESC`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

accessrequest.AddRequest = ({ idUser, nameShop, addressShop, email, phoneNumber }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO accessrequest (IDUser,NameShop,AddressShop,Email,PhoneNumber,Status, CreateAt) VALUES 
            (${idUser},'${nameShop}','${addressShop}', '${email}','${phoneNumber}', false , CURRENT_TIMESTAMP)`,
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

accessrequest.FindRequestByIDUser = ({ IDUser }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM accessrequest WHERE IDUser = ${IDUser}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

accessrequest.UpdateStatus = ({ IDRequest }) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE accessrequest SET Status = true WHERE IDRequest = ${IDRequest}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = accessrequest;
