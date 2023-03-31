const db = require('../../Config/Db');

const Order = function (order) {
    this.IDOrder = order.IDOrder;
    this.IDPost = order.IDPostSales;
    this.Count = order.Count;
    this.Price = order.Price;
    this.Total = order.Total;
};

Order.Add = ({ orders, idBill }) => {
    return new Promise((resolve, reject) => {
        orders.map((order) => {
            db.query(
                `INSERT INTO orders (IDBill,IDPost,Count, Price, TotalOrder ) VALUES (${idBill},${
                    order.idPost
                },${order.count},${order.price},${order.count * order.price} )`,
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                },
            );
        });
        resolve({ result: true });
    });
};
module.exports = Order;
