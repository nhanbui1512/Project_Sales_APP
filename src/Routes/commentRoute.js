const express = require('express');

const commentController = require('../App/Controllers/commentController');

const router = express.Router();

router.get('/find/:idpost', commentController.findCommentsByIdPost);

router.post('/add/:idpost', commentController.createComment);

router.delete('/delete/:idcomment', commentController.deleteComment);

router.put('/update/:idcomment', commentController.updateComment);

module.exports = router;
