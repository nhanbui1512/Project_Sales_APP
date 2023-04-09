const cartController = require('../App/Controllers/cartController');

const express = require('express');
const { route } = require('./homeRoute');
const router = express.Router();

router.post('/addproduct', cartController.addProduct);
router.get('/getall', cartController.getAllProductInCart);
router.delete('/delete', cartController.deleteProduct);

module.exports = router;
