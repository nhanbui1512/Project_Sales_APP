const orderController = require('../app/controllers/orderController');

const express = require('express');
const { route } = require('./homeRoute');
const router = express.Router();

router.post('/orders', orderController.Order);
router.get('/find', orderController.getOrderByBill);
router.get('/getonmonth', orderController.getOrderOnMonth);

module.exports = router;
