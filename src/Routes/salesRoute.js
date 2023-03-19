const salesController = require('../app/controllers/salesController');

const express = require('express');
const router = express.Router();

router.get('/getall', salesController.GetAll);

module.exports = router;
