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
    const comments = await placementRepository.getById(id);
    return comments.comments;
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
    comment.replies.push(data);
    const update = await commentRepository.update(id, comment);
    return update;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot add a reply', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteComment(blogId, commentId) {
  try {
    const course = await placementRepository.get(blogId);
    course.comments.filter((comment) => comment._id != commentId);
    await placementRepository.update(course);
    const comment = await commentRepository.destroy(commentId);

    if (!comment) {
      throw new AppError(
        'no comment exist for the given commentId',
        StatusCodes.BAD_REQUEST
      );
    }
    return comment;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find comments',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getById,
  createComment,
  createDiscussion,
  addReply,
  deleteComment,
};
