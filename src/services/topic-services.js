const { TopicRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const topicRepository = new TopicRepository();

async function getTopic(id, title) {
  try {
    const courses = await topicRepository.getByCourseId(id, title);
    return courses;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find topic', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteTopic(id) {
  try {
    const courses = await topicRepository.destroy(id);
    return courses;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find topic', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function createTopic(data) {
  try {
    const topic = await topicRepository.create(data);
    return topic;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot create topic', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = { getTopic, deleteTopic, createTopic };
