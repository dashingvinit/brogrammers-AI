const {
  CourseRepository,
  UserRepository,
  TopicRepository,
  CollectionRepository,
  QuizRepository,
} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const courseRepository = new CourseRepository();
const userRepository = new UserRepository();
const topicRepository = new TopicRepository();
const collectionRepository = new CollectionRepository();
const quizRepository = new QuizRepository();

async function getCourses() {
  try {
    const courses = await courseRepository.getAll();
    return courses;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find courses', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCoursesById(id) {
  try {
    const courses = await courseRepository.getAllByIds(id);
    return courses;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find courses', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAdminCourses() {
  try {
    const users = await userRepository.getAllAdmin();
    const userIds = users.map((user) => user._id);
    const courses = await courseRepository.getAllByIds(userIds);
    return courses;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find the course', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCourse(id) {
  try {
    const course = await courseRepository.get(id);
    return course;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find the course', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getRecent(id) {
  try {
    const recent = await userRepository.getPopulate(id);
    return recent;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find courses', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function createCourse(data) {
  try {
    const course = await courseRepository.create(data);
    if (course) await userRepository.updateTrialStatus(data.userId);
    return course;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot create a new Course object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateCourse(id, updates) {
  try {
    const course = await courseRepository.get(id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Update simple fields
    if (updates.title) {
      course.title = updates.title;
    }
    if (updates.keyNotes) {
      course.keyNotes = updates.keyNotes;
    }
    if (updates.syllabus) {
      course.syllabus = updates.syllabus;
    }
    if (updates.handwrittenNotes) {
      course.handwrittenNotes = updates.handwrittenNotes;
    }
    if (updates.detailedNotes) {
      course.detailedNotes = updates.detailedNotes;
    }

    // Update array fields
    if (updates.worksheets && Array.isArray(updates.worksheets)) {
      course.worksheets = updates.worksheets.map((worksheet) => ({
        title: worksheet.title,
        link: worksheet.link,
      }));
    }

    if (updates.keyNotes && Array.isArray(updates.keyNotes)) {
      course.keyNotes = updates.keyNotes.map((note) => ({
        title: note.title,
        content: note.content,
      }));
    }

    const updatedCourse = await courseRepository.update(id, course);
    return updatedCourse;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot update the Course object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteCourse(id) {
  try {
    const collection = await collectionRepository.removeCourse(id);
    const topics = await topicRepository.destroyAll(id);
    const recents = await userRepository.removeRecentlyViewed(id);
    const removeQuiz = await quizRepository.removeQuiz(id);
    const course = await courseRepository.destroy(id);
    if (!course) {
      throw new AppError('no course exist for the given Id', StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    throw new AppError('Cannot delete the course', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateCourseObject(id, course) {
  try {
    const updatedCourse = await courseRepository.update(id, course);
    return updatedCourse;
  } catch (error) {
    throw new AppError('Cannot update the course', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  getCourses,
  getCoursesById,
  getAdminCourses,
  getCourse,
  getRecent,

  createCourse,
  updateCourse,
  deleteCourse,
  updateCourseObject,
};
