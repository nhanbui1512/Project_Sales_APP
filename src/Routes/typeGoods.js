const typeGoodsController = require('../App/Controllers/typeGoodsController');

const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/Public/Uploads/Images/TypeGoods');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

var upload = multer({ storage: storage });

router.get('/getall', typeGoodsController.getAll);
router.get('/gettype', typeGoodsController.getByID);
router.post('/add', upload.single('icon'), typeGoodsController.addType);
router.put('/update', typeGoodsController.updateType);
router.put('/changeicon', upload.single('icon'), typeGoodsController.changeIconType);

module.exports = router;
