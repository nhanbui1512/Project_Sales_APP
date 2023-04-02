const Bill = require('../Model/bill.model');
const bill = require('../Model/bill.model');
const order = require('../Model/order.model');

class orderController {
    Order(req, response) {
        const orders = req.body.orders;
        const idUser = req.IDUser;
        const total = req.body.total;

        bill.Add({ idUser, total })
            .then((res) => {
                return res.insertId;
            })
            .then((idBill) => {
                order
                    .Add({ orders: orders, idBill: idBill })
                    .then((res) => {
                        response
                            .status(200)
                            .json({ result: true, message: 'Insert Orders is successful' });
                    })
                    .catch((err) => {
                        console.log(err);
                        response
                            .status(501)
                            .json({ result: false, message: 'Insert Orders is not successful' });
                    });
            })
            .catch((err) => {
                return response.status(501).json(err);
            });
    }

    getOrderByBill(req, response) {
        const billId = req.query.bill_id;
        Bill.getBillById({ billId: billId })
            .then((res) => {
                return res[0];
            })
            .then((bill) => {
                Bill.getOrdersByBillId({ billId: billId })
                    .then((orders) => {
                        response.status(200).json({
                            bill: bill,
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

        bill.getOnMonth({ month, year })
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
