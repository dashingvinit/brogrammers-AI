const CrudRepository = require('./crud-repository');
const ProjectBasket = require('../models/basket-model');

class BasketRepository extends CrudRepository {
  constructor() {
    super(ProjectBasket);
  }
}

module.exports = BasketRepository;
