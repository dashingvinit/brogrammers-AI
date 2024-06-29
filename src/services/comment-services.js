const {
  CommentRepository,
  PlacementRepository,
  CourseRepository,
} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const commentRepository = new CommentRepository();
const placementRepository = new PlacementRepository();
const courseRepository = new CourseRepository();

async function getById(id) {
  try {
    const placementStory = await placementRepository.getById(id);
    const commentIds = placementStory.comments;
    const populatedComments = [];

    for (const commentId of commentIds) {
      const comment = await commentRepository.getByIdAndPopulate(commentId);
      populatedComments.push(comment);
    }

    populatedComments.reverse();
    return populatedComments;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find comments',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createComment(id, data) {
  try {
    const comment = await commentRepository.create(data);
    const blog = await placementRepository.get(id);
    blog.comments.push(comment._id);
    const update = await placementRepository.update(id, blog);
    return update;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot create comment',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createDiscussion(id, data) {
  try {
    const comment = await commentRepository.create(data);
    const course = await courseRepository.get(id);
    course.discussion.push(comment._id);
    const update = await courseRepository.update(id, course);
    return update;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot create discussion',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function addReply(id, data) {
  try {
    const comment = await commentRepository.get(id);
    if (!comment) return;
    comment.replies.push(data);
    const update = await commentRepository.update(id, comment);
    return update;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot add a reply', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function likeComment(commentId, userId) {
  try {
    const comment = await commentRepository.get(commentId);
    const alreadyLiked = comment.likes.some(
      (like) => like.toString() === userId
    );

    if (!alreadyLiked) {
      comment.likes.push(userId);
    } else {
      comment.likes = comment.likes.filter(
        (like) => like.toString() !== userId
      );
    }
    const update = await commentRepository.update(commentId, comment);
    return update;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot update comment likes',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function likeReply(commentId, replyId, userId) {
  try {
    const comment = await commentRepository.get(commentId);
    const reply = comment.replies.id(replyId);

    if (!reply) throw new AppError('Reply not found', StatusCodes.NOT_FOUND);

    const alreadyLiked = reply.likes.some((like) => like.toString() === userId);

    if (!alreadyLiked) {
      reply.likes.push(userId);
    } else {
      reply.likes = reply.likes.filter((like) => like.toString() !== userId);
    }
    const update = await commentRepository.update(commentId, comment);
    return update;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot update reply likes',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteComment(blogId, commentId) {
  try {
    const blog = await placementRepository.get(blogId);
    const updatedComments = blog.comments.filter(
      (comment) => comment._id.toString() !== commentId.toString()
    );
    blog.comments = updatedComments;
    const deletedComment = await commentRepository.destroy(commentId);
    if (!deletedComment) {
      throw new AppError(
        'Failed to delete the comment',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    await placementRepository.update(blog._id, blog);
    return deletedComment;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot delete comment',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getById,
  createComment,
  createDiscussion,
  addReply,
  likeComment,
  likeReply,
  deleteComment,
};
