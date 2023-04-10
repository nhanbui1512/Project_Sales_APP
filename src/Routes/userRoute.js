const userController = require('../App/Controllers/userController');
const isLoginMiddleWare = require('../App/Middleware/isLoginMiddleware');
const accessAdmin = require('../App/Middleware/adminMidleware');
const multer = require('multer');
const express = require('express');
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/Public/Uploads/Images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

var upload = multer({ storage: storage });

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
router.put('/update',isLoginMiddleWare ,userController.UpdateUser);

router.post('/registerSales', isLoginMiddleWare,userController.RegisterSales);

router.post('/:iduser/requestAccess',isLoginMiddleWare,accessAdmin ,userController.RequestAccess);

// Change Pass Word
router.put('/changepassword', userController.ChangePassword);

router.post(
    '/changeavatar',
    isLoginMiddleWare,
    upload.single('photo'),
    userController.ChangeAvatar,
);

module.exports = router;
