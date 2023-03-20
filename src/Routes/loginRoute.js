const loginController = require('../app/controllers/loginController');

const express = require('express');
const router = express.Router();

router.post('/checklogin', loginController.checkLogin);

module.exports = router;
