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

    addType(req, response) {
        const nameType = req.body.nameType;
        typeModel
            .insert({ nameType })
            .then((res) => {
                response.status(200).json(res);
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'server error' });
            });
    }

    updateType(req, response) {
        const nameType = req.body.nameType;
        const idType = req.query.idType;

        console.log(nameType);
        console.log(idType);

        typeModel
            .update({ nameType: nameType, idType: idType })
            .then((res) => {
                // console.log(res);
                if (res.affectedRows != 1) {
                    response.status(501).json({ result: false, message: 'not find typegoods id' });
                } else {
                    response.status(200).json({ result: true, message: 'update successful' });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'server is error' });
            });
    }
}
module.exports = new typeGoodsController();
