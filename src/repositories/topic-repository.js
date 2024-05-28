const CrudRepository = require('./crud-repository');
const Topic = require('../models/topic-model');

class TopicRepository extends CrudRepository {
  constructor() {
    super(Topic);
  }

  async getByUserId(id, title) {
    const topic = await Topic.findOne({ userId: id, title });
    return topic;
  }
}
module.exports = TopicRepository;
