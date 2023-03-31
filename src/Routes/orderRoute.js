const orderController = require('../app/controllers/orderController');

const express = require('express');
const router = express.Router();

router.post('/orders', orderController.Order);

module.exports = router;
