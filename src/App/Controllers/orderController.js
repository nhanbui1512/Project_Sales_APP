const order = require('../Model/order.model');
const billModel = require('../Model/bill.model');

class orderController {
    Order(req, response) {
        const orders = req.body.orders;
        const idUser = req.IDUser;
        var total = 0;
        const address = req.body.address;

        orders.map((order) => {
            total += order.count * order.price;
        });

        billModel
            .Add({ idUser, total, address })
            .then((res) => {
                return res.insertId;
            })
            .then((idBill) => {
                order
                    .Add({ orders: orders, idBill: idBill })
                    .then((res) => {
                        response.status(200).json({ result: true, message: 'Insert Orders is successful' });
                    })
                    .catch((err) => {
                        console.log(err);
                        response.status(501).json({ result: false, message: 'Insert Orders is not successful' });
                    });
            })
            .catch((err) => {
                console.log(err);
                return response.status(501).json({ result: false, message: 'Server is error' });
            });
    }

    getOrderByBill(req, response) {
        const billId = req.query.bill_id;
        billModel
            .getBillById({ billId: billId })
            .then((res) => {
                return res[0];
            })
            .then((bill) => {
                billModel
                    .getOrdersByBillId({ billId: billId })
                    .then((orders) => {
                        response.status(200).json({
                            bill: {
                                IDBill: bill.IDBill,
                                UserName: bill.UserName,
                                Email: bill.Email,
                                Address: bill.Address,
                                CreateAt: bill.CreateAt,
                                Total: bill.Total,
                            },
                            orders: orders,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        response.status(501).json({ result: false, message: 'server is error' });
                    });
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'server is err' });
            });
    }

    getOrderOnMonth(req, response) {
        const month = req.query.month;
        const year = req.query.year;

        billModel
            .getOnMonth({ month, year })
            .then((bills) => {
                response.status(200).json({ bill: bills });
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ message: 'fail' });
            });
    }
}
module.exports = new orderController();
