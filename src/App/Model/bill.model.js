const db = require('../../Config/Db');

const Bill = function (bill) {
    this.IDBill = bill.IDBill;
    this.Total = bill.total;
    this.IDUser = bill.IDUser;
    this.CreateAt = bill.CreateAt;
};

Bill.Add = ({ idUser, total }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO bill (IDUser,Total) VALUES (${idUser},${total})`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};
module.exports = Bill;
