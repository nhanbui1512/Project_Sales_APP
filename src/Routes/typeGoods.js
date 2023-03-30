const typeGoodsController = require('../App/Controllers/typeGoodsController');

const express = require('express');
const router = express.Router();

router.get('/getall', typeGoodsController.getAll);
router.post('/add', typeGoodsController.addType);
router.put('/update', typeGoodsController.updateType);

module.exports = router;
