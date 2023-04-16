const typeModel = require('../Model/typegoods.model');

class typeGoodsController {
    //GET /news
    getAll(req, response) {
        typeModel
            .getall()
            .then((res) => {
                var data = res.map((item) => {
                    item.IconPath = `/uploads/images/typegoods/${item.IconPath}`;
                    return item;
                });

                response.status(200).json({ result: true, data: data });
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'Server error' });
            });
    }

    addType(req, response) {
        const nameType = req.body.nameType;
        const icon = req.file;
        console.log(icon);
        if (icon) {
            typeModel
                .insert({ nameType, fileName: icon.filename })
                .then((res) => {
                    response
                        .status(200)
                        .json({ result: true, insertID: 15, message: 'Add typegoods successful' });
                })
                .catch((err) => {
                    console.log(err);
                    response.status(501).json({ result: false, message: 'server error' });
                });
        } else {
            response.status(200).json({ result: false, message: 'file not attached' });
        }
    }

    updateType(req, response) {
        const nameType = req.body.nameType;
        const idType = req.query.idType;

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

    changeIconType(req, response) {
        const file = req.file;
        const idType = req.query.idType;

        if (file && idType) {
            typeModel
                .updateIcon({ nameFile: file.filename, idType: idType })
                .then((res) => {
                    response.status(200).json({ result: true, message: 'update icon successful' });
                })
                .catch((err) => {
                    response
                        .status(500)
                        .json({ result: true, message: 'update icon unsuccessful' });
                });
        } else {
            response
                .status(400)
                .json({ result: false, message: 'file is not attached or not found idType' });
        }
    }

    getByID(req, response) {
        const idType = req.query.id_type;
        typeModel
            .getByID({ idType })
            .then((res) => {
                if (res.length > 0) {
                    response.status(200).json({ result: true, data: res[0] });
                } else {
                    response.status(401).json({ result: false, message: 'not found typeGood' });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'Server is error' });
            });
    }
}
module.exports = new typeGoodsController();
