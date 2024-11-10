const CrudRepository = require('./crud-repository');
const Solution = require('../models/solution-model');

class SolutionRepository extends CrudRepository {
  constructor() {
    super(Solution);
  }
}

module.exports = SolutionRepository;
