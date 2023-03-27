const typeGoodsController = require('../App/Controllers/typeGoodsController');

const express = require('express');
const router = express.Router();

router.get('/getall', typeGoodsController.getAll);

module.exports = router;
