const userController = require('../app/controllers/userController');

const express = require('express');
const router = express.Router();

router.get('/getall', userController.GetAll);
router.get('/find', userController.FindByID);
router.get('/findname', userController.FindInCludeName);

router.post('/create', userController.CreateUser);

router.put('/update', userController.UpdateUser);

module.exports = router;
