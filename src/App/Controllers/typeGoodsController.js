const typeModel = require('../Model/typegoods.model');

class typeGoodsController {
    //GET /news
    getAll(req, response) {
        typeModel
            .getall()
            .then((res) => {
                response.status(200).json({ result: true, data: res });
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'Server error' });
            });
    }
}
module.exports = new typeGoodsController();
