const CrudRepository = require('./crud-repository');
const Comment = require('../models/comments-model');

class CommentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }

  async getByIdAndPopulate(id) {
    try {
      const comment = await this.model
        .findById(id)
        .populate('author', 'name imageUrl')
        .populate('replies.author', 'name imageUrl')
        .exec();

      return comment;
    } catch (error) {
      throw new Error(
        `Failed to fetch comment with ID ${id}: ${error.message}`
      );
    }
  }
}

module.exports = CommentRepository;
