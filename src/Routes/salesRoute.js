const salesController = require('../app/controllers/salesController');

const multer = require('multer');
const express = require('express');

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/Public/Uploads/Images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

var upload = multer({ storage: storage });

router.get('/getall', salesController.GetAll);
router.get('/find', salesController.FindByID);

router.post('/add', upload.array('photos', 12), salesController.CreatePostSales);

module.exports = router;
