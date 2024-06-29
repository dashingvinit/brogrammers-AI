const express = require('express');
const router = express.Router();

const { CommentController } = require('../../controllers');

router.get('/:blogId', CommentController.getById);

router.post('/blog/:id', CommentController.createComment);
router.post('/course/:id', CommentController.createDiscussion);

router.patch('/reply/:commentId', CommentController.addReply);
router.patch('/likes/:commentId/:userId', CommentController.likeComment);
router.patch(
  '/reply/likes/:commentId/:replyId/:userId',
  CommentController.likeReply
);

router.delete('/:blogId/:commentId', CommentController.deleteComment);

module.exports = router;
