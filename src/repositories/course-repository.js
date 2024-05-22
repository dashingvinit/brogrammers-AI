const CrudRepository = require('./crud-repository');
const Course = require('../models/course-model');

class CourseRepository extends CrudRepository {
  constructor() {
    super(Course);
  }
}

module.exports = CourseRepository;
