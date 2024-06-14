const CrudRepository = require('./crud-repository');
const Collection = require('../models/collection-model');

class CollectionRepository extends CrudRepository {
  constructor() {
    super(Collection);
  }

  async getByTitle(title) {
    const collection = await Collection.findOne({
      title: new RegExp(`^${title}$`, 'i'),
    }).populate('courses');
    return collection;
  }

  async removeCourse(courseId) {
    await Collection.updateMany(
      { courses: courseId }, // Filter to find collections with the courseId
      { $pull: { courses: courseId } } // Update to remove the courseId from the courses array
    );
  }

  async getAllByIds(ids) {
    const collections = await Collection.find({ userId: { $in: ids } });
    return collections;
  }
}

module.exports = CollectionRepository;
