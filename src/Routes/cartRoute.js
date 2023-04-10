const cartController = require('../App/Controllers/cartController');

const express = require('express');
const router = express.Router();

router.post('/addproduct', cartController.addProduct);
router.get('/getall', cartController.getAllProductInCart);
router.put('/updatecount', cartController.updateCountProduct);
router.delete('/delete', cartController.deleteProduct);
router.delete('/deleteall', cartController.deleteAllProduct);

module.exports = router;
