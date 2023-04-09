const cartController = require('../App/Controllers/cartController');

const express = require('express');
const router = express.Router();

router.post('/addproduct', cartController.addProduct);
router.get('/getall', cartController.getAllProductInCart);

module.exports = router;
