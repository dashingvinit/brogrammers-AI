const CrudRepository = require('./crud-repository');
const Topic = require('../models/topic-model');

class TopicRepository extends CrudRepository {
  constructor() {
    super(Topic);
  }

  async getByCourseId(id, title) {
    const topic = await Topic.findOne({ courseId: id, title });
    return topic;
  }
}
module.exports = TopicRepository;
