const CrudRepository = require('./crud-repository');
const Problem = require('../models/problem-model');

class ProblemRepository extends CrudRepository {
  constructor() {
    super(Problem);
  }
}

module.exports = ProblemRepository;
