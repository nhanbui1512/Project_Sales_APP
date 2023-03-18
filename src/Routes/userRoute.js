const userController = require('../app/controllers/userController');

const express = require('express');
const router = express.Router();

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
router.put('/update', userController.UpdateUser);

// Change Pass Word
router.put('/changepassword', userController.ChangePassword);

module.exports = router;
