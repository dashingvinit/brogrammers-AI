const CrudRepository = require('./crud-repository');
const Problem = require('../models/problem-model');

class ProblemRepository extends CrudRepository {
  constructor() {
    super(Problem);
  }

  async getQs(id) {
    const qs = await Problem.findOne({ qs_id: id });
    return qs;
  }
}

module.exports = ProblemRepository;
