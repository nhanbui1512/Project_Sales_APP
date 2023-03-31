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
}
module.exports = new orderController();
