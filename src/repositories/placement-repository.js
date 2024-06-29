const CrudRepository = require('./crud-repository');
const PlacementStory = require('../models/placement-model');

class PlacementRepository extends CrudRepository {
  constructor() {
    super(PlacementStory);
  }

  async getLatest() {
    const latestBlogs = await PlacementStory.find({})
      .sort({ createdAt: -1 })
      .limit(12);
    return latestBlogs;
  }

  async getById(id) {
    const data = await PlacementStory.findOne({ _id: id });
    return data;
  }
}

module.exports = PlacementRepository;
