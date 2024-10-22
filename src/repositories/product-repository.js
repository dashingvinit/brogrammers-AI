const CrudRepository = require('./crud-repository');
const Product = require('../models/product-model');

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }
}

module.exports = ProductRepository;
