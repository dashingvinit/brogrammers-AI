const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { Auth } = require('../utils/common');

const userRepository = new UserRepository();

async function createUser(data) {
  try {
    let user = await userRepository.create({
      _id: data._id,
      name: data.name,
      email: data.email,
      imageUrl: data.imageUrl,
      password: data.password,
      role: data.role,
    });
    const jwt = Auth.createToken({
      userId: user._id,
    });
    return { jwt, user };
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot create a new User object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function loginUser(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    console.log(user);
    if (!user) throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);

    const passwordMatch = Auth.checkPassword(data.password, user.password);
    if (!passwordMatch)
      throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);

    const jwt = Auth.createToken({
      name: user.name,
      email: user.email,
    });
    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Something went wrong',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getUser(id) {
  try {
    const user = await userRepository.get(id);
    return user;
  } catch (error) {
    throw new AppError(
      'Cannot get data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteUser(id) {
  try {
    const user = await userRepository.destroy(id);
    if (!user) {
      throw new AppError(
        'no user exist for the given userId',
        StatusCodes.BAD_REQUEST
      );
    }
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot delete user from the database',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function patchUser(id, data) {
  try {
    const response = await userRepository.update(id, data);
    return response;
  } catch (error) {
    throw new AppError(
      'Cannot update data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function viewCourse(userId, courseId) {
  try {
    const user = await userRepository.get(userId);
    user.recentlyViewed = user.recentlyViewed.filter(
      (entry) => !entry.course.equals(courseId)
    );
    user.recentlyViewed.unshift({ course: courseId, viewedAt: new Date() });

    if (user.recentlyViewed.length > 10) {
      user.recentlyViewed.pop();
    }
    const response = await userRepository.update(userId, user);
    return response;
  } catch (error) {
    throw new AppError(
      'Cannot update data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateContinue(userId, blogId) {
  try {
    const user = await userRepository.get(userId);
    user.recentBlog = user.recentBlog.filter(
      (entry) => !entry.blog.equals(blogId)
    );
    user.recentBlog.unshift({ blog: blogId, viewedAt: new Date() });

    if (user.recentBlog.length > 10) {
      user.recentBlog.pop();
    }
    const response = await userRepository.update(userId, user);
    return response;
  } catch (error) {
    throw new AppError(
      'Cannot update data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateBookmarked(userId, blogId) {
  try {
    const user = await userRepository.get(userId);
    const bookmarkIndex = user.bookMarks.indexOf(blogId);
    if (bookmarkIndex !== -1) {
      user.bookMarks.splice(bookmarkIndex, 1);
    } else {
      user.bookMarks.push(blogId);
    }
    const response = await userRepository.update(userId, user);
    return response;
  } catch (error) {
    throw new AppError(
      'Cannot update bookmark data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function activatePremium(
  userId,
  active,
  startDate,
  endDate,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
) {
  try {
    if (!startDate || !endDate) {
      throw new AppError(
        'Start date and end date are required',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    const user = await userRepository.activatePremium(
      userId,
      active,
      startDate,
      endDate,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );
    if (!user) {
      throw new AppError(
        'Cannot find a user',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return user;
  } catch (error) {
    throw new AppError(
      'Cannot activate users plan',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateTrialStatus(userId) {
  try {
    const user = await userRepository.activatePremium(userId);
    return user;
  } catch (error) {
    throw new AppError(
      'Cannot update trial state',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  deleteUser,
  patchUser,
  viewCourse,
  updateContinue,
  updateBookmarked,
  activatePremium,
  updateTrialStatus,
};
