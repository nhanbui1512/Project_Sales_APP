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
        cb(null, file.originalname);
    },
    rename: function (fieldname, filename) {
        return filename + '-' + Date.now();
    },
});

var upload = multer({ storage: storage });

// get all user
router.get('/getall', userController.GetAll);

router.get('/myprofile', isLoginMiddleWare, userController.getMyProfile);

// Find User by ID
router.get('/find', userController.FindByID);

// Find User include name
router.get('/findname', userController.FindInCludeName);

router.get('/finduser', userController.FindUserByUserName);
// Create User
router.post('/create', isLoginMiddleWare, accessAdmin, userController.CreateUser);

// Update Profile
router.put('/update', isLoginMiddleWare, userController.UpdateUser);

router.post('/registerSales', isLoginMiddleWare, userController.RegisterSales);

router.put('/acceptrequeset', isLoginMiddleWare, accessAdmin, userController.AcceptSalesAccount);

router.get('/allrequest', isLoginMiddleWare, accessAdmin, userController.getAllRequest);

// Change Pass Word
router.put('/changepassword', isLoginMiddleWare, userController.ChangePassword);

router.post(
    '/changeavatar',
    isLoginMiddleWare,
    upload.single('photo'),
    userController.ChangeAvatar,
);

router.post('/register', userController.registerAccount);

module.exports = router;
