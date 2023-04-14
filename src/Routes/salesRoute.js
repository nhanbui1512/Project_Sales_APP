const newLocal = '../app/controllers/salesController';
const salesController = require(newLocal);

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
router.put('/update', salesController.UpdatePost);
router.post('/add', upload.array('photos', 12), salesController.CreatePostSales);
router.get('/getrand', salesController.GetRand);

// /api/sales/delete?id_post=
router.delete('/delete', salesController.DelPost);
module.exports = router;
