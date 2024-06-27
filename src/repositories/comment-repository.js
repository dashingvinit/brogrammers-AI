const CrudRepository = require('./crud-repository');
const Comment = require('../models/comments-model');

class CommentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }
}

module.exports = CommentRepository;
