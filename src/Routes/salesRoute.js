const salesController = require('../app/controllers/salesController');

const express = require('express');
const router = express.Router();

router.get('/getall', salesController.GetAll);

router.post('/add', salesController.CreatePostSales);

module.exports = router;
