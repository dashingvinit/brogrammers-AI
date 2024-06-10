const { StatusCodes } = require('http-status-codes');
const { PlacementService, OpenAIService } = require('../services/');
const { successResponse, errorResponse } = require('../utils/common');

async function getAll(req, res) {
  try {
    const stories = await PlacementService.getAllStories();
    successResponse.data = stories;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getStoryById(req, res) {
  try {
    const story = await PlacementService.getStoryById(req.params.id);
    successResponse.data = story;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getLatest(req, res) {
  try {
    const latest = await PlacementService.getLatest();
    successResponse.data = latest;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getContinue(req, res) {
  try {
    const blogs = await PlacementService.getContinue(req.params.id);
    successResponse.data = blogs;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getBookmarked(req, res) {
  try {
    const blogs = await PlacementService.getBookmarked(req.params.id);
    successResponse.data = blogs;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function createStory(req, res) {
  try {
    const data = req.body;
    const improved = await OpenAIService.getImproved(data);
    const blog = { ...data, markdown: improved };
    const newStory = await PlacementService.createStory(blog);
    successResponse.data = newStory;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function updateStory(req, res) {
  try {
    const updatedStory = await PlacementService.updateStory(
      req.params.id,
      req.body
    );
    successResponse.data = updatedStory;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function updateLikes(req, res) {
  try {
    const { userId, blogId } = req.params;
    const story = await PlacementService.getStoryById(blogId);

    const alreadyLiked = story.likes.some(
      (like) => like.userId.toString() === userId
    );

    if (!alreadyLiked) {
      story.likes.push({ userId });
    } else if (alreadyLiked) {
      story.likes = story.likes.filter(
        (like) => like.userId.toString() !== userId
      );
    }

    const updatedStory = await PlacementService.updateStory(blogId, {
      likes: story.likes,
    });
    successResponse.data = updatedStory;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function deleteStory(req, res) {
  try {
    const deletedStory = await PlacementService.deleteStory(req.params.id);
    successResponse.data = deletedStory;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  getAll,
  getStoryById,
  getLatest,
  getContinue,
  getBookmarked,
  updateStory,
  updateLikes,
  createStory,
  deleteStory,
};
