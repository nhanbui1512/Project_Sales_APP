const typeGoodsController = require('../App/Controllers/typeGoodsController');
const adminMidleWare = require('../App/Middleware/adminMidleware');

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
router.post('/add', adminMidleWare, upload.single('icon'), typeGoodsController.addType);
router.put('/update', adminMidleWare, typeGoodsController.updateType);
router.put('/changeicon', adminMidleWare, upload.single('icon'), typeGoodsController.changeIconType);

module.exports = router;
