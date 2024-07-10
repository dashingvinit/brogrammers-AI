const { PlacementRepository, UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const placementRepository = new PlacementRepository();
const userRepository = new UserRepository();

async function getAllStories() {
  try {
    const stories = await placementRepository.getAllStories();
    return stories;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find placement stories',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getStoryById(id) {
  try {
    const story = await placementRepository.getById(id);
    return story;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find placement stories',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getLatest() {
  try {
    const story = await placementRepository.getLatest();
    return story;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find placement stories',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getContinue(id) {
  try {
    const story = await userRepository.getContinue(id);
    return story;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find placement stories',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getBookmarked(id) {
  try {
    const story = await userRepository.getBookmarked(id);
    return story;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find placement stories',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createStory(data) {
  try {
    const story = await placementRepository.create(data);
    return story;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot create placement stories',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteStory(id) {
  try {
    const story = await placementRepository.destroy(id);
    return story;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot create placement stories',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateStory(id, data) {
  try {
    const res = await placementRepository.update(id, data);
    return res;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot create placement stories',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getAllStories,
  getStoryById,
  getLatest,
  getContinue,
  getBookmarked,
  createStory,
  deleteStory,
  updateStory,
};
