const db = require('../../Config/Db');

const bill = function (bill) {
    this.IDBill = bill.IDBill;
    this.Total = bill.total;
    this.IDUser = bill.IDUser;
    this.CreateAt = bill.CreateAt;
};

bill.Add = ({ idUser, total, address }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO bill (IDUser,Total,Address) VALUES (${idUser},${total},'${address}')`,
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

bill.getBillById = ({ billId }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT user.IDUser, user.UserName, user.Email, user.PhoneNumber, user.AvatarPath, bill.IDBill,bill.Address, bill.CreateAt, bill.Total FROM bill JOIN user ON bill.IDUser = user.IDUser AND bill.IDBill = ${billId}`,
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

bill.getOrdersByBillId = ({ billId }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT orders.IDOrder, orders.IDPost, postsales.Title, postsales.Description, orders.Count, orders.Price FROM bill JOIN orders ON bill.IDBill = orders.IDBill AND bill.IDBill = ${billId} JOIN postsales on postsales.IDPost = orders.IDPost`,
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

bill.getOnMonth = ({ month, year }) => {
    return new Promise((resove, reject) => {
        db.query(
            `SELECT user.IDUser, user.UserName, bill.IDBill, bill.CreateAt, bill.Total
            FROM bill, user
            WHERE user.IDUser = bill.IDUser AND DATE(bill.CreateAt) >= '${year}-${month}-01' AND DATE(bill.CreateAt) <= '${year}-${month}-31';`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resove(res);
                }
            },
        );
    });
};
module.exports = bill;
