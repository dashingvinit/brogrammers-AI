const { CollectionRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const collectionsRepository = new CollectionRepository();

async function getCollectionByTitle(title) {
  try {
    const res = await collectionsRepository.getByTitle(title);
    return res;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot get collection',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createCollection(data) {
  try {
    const res = await collectionsRepository.create(data);
    return res;
  } catch (error) {
    throw new AppError(
      'Cannot create collection',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCollection(id, courseIds) {
  try {
    const collection = await collectionsRepository.get(id);
    console.log(collection);
    if (!collection) {
      throw new AppError('Collection not found', StatusCodes.NOT_FOUND);
    }
    collection.courses.push(...courseIds);
    const updatedCollection = await collectionsRepository.update(id, {
      courses: collection.courses,
    });
    return updatedCollection;
  } catch (error) {
    throw new AppError(
      'Cannot update collection',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { getCollectionByTitle, createCollection, updateCollection };
