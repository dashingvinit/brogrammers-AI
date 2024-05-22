const CrudRepository = require('./crud-repository');
const Blog = require('../models/blog-model');

class BlogRepository extends CrudRepository {
  constructor() {
    super(Blog);
  }
}

module.exports = BlogRepository;
