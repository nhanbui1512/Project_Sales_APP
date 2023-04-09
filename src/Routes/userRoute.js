const userController = require('../app/controllers/userController');

const express = require('express');
const router = express.Router();

const isLoginMiddleWare = require('../App/Middleware/isLoginMiddleware');
const adminMidleWare = require('../App/Middleware/adminMidleware');
// get all user
router.get('/getall', userController.GetAll);

// Find User by ID
router.get('/find', userController.FindByID);

// Find User include name
router.get('/findname', userController.FindInCludeName);

router.get('/finduser', userController.FindUserByUserName);
// Create User
router.post('/create', userController.CreateUser);

// Update Profile
router.put('/update', isLoginMiddleWare,userController.UpdateUser);

router.post('/registerSales', isLoginMiddleWare,userController.RegisterSales);

router.post('/:iduser/requestAccess', isLoginMiddleWare,adminMidleWare,userController.RequestAccess);

// Change Pass Word
router.put('/changepassword', userController.ChangePassword);

module.exports = router;
