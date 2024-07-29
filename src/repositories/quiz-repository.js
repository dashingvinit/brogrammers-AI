const CrudRepository = require('./crud-repository');
const Quiz = require('../models/quiz-model');

class BasketRepository extends CrudRepository {
  constructor() {
    super(Quiz);
  }

  async getByCourse(id) {
    const quizzes = await Quiz.find({ courseId: id });
    return quizzes;
  }
}

module.exports = BasketRepository;
