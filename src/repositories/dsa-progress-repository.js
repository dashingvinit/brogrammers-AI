const CrudRepository = require('./crud-repository');
const DSAProgress = require('../models/dsa-progress-model');

class DSAProgressRepositoy extends CrudRepository {
  constructor() {
    super(DSAProgress);
  }
  async getByID(id) {
    const progress = await DSAProgress.findOne({ userId: id }).populate(topics);
    return progress;
  }

  async addQuestionToTopic(userId, dsId, problemId) {
    let progress = await DSAProgress.findOne({ userId });

    if (!progress) {
      // Create a new progress entry for the user
      progress = new DSAProgress({ userId, topics: [] });
    }

    let topic = progress.topics.find((topic) => topic.dsId === dsId);

    if (!topic) {
      // Create a new topic entry
      topic = { dsId, questions: [] };
      progress.topics.push(topic);
    }

    // Add the question if it's not already present
    if (!topic.questions.some((question) => question.problemId === problemId)) {
      topic.questions.push({ problemId });
    }

    await progress.save();
    return progress;
  }
}

module.exports = DSAProgressRepositoy;
