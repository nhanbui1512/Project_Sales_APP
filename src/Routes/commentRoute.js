const express = require('express');

const commentController = require('../App/Controllers/commentController');

const router = express.Router();

router.get('/find', commentController.findCommentsByIdPost);

router.post('/add/:idpost', commentController.createComment);

module.exports = router;
