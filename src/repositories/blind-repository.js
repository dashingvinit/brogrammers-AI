const CrudRepository = require('./crud-repository');
const Blind = require('../models/blind-model');

class CollectionRepository extends CrudRepository {
  constructor() {
    super(Blind);
  }

  async getById(id) {
    const sheet = await Blind.findOne({ userId: id });
    return sheet;
  }
}

module.exports = CollectionRepository;
