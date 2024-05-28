const CrudRepository = require('./crud-repository');
const Course = require('../models/course-model');

class CourseRepository extends CrudRepository {
  constructor() {
    super(Course);
  }

  async getAllByIds(ids) {
    const courses = await Course.find({ userId: { $in: ids } });
    return courses;
  }
}

module.exports = CourseRepository;
