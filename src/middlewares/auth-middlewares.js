const { StatusCodes } = require('http-status-codes');

const { errorResponse } = require('../utils/common');
const { UserService } = require('../services');
const AppError = require('../utils/errors/app-error');

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    errorResponse.message = 'Something went wrong while authenticating user';
    errorResponse.error = new AppError(
      ['Email not found in the incoming request in the correct form'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.password) {
    errorResponse.message = 'Something went wrong while authenticating user';
    errorResponse.error = new AppError(
      ['password not found in the incoming request in the correct form'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
}

// async function checkAuth(req, res, next) {
//   try {
//     const response = await UserService.isAuthenticated(
//       req.headers['brogrammers-token']
//     );
//     //  console.log('response of check auth', response);
//     if (response) {
//       req.user = response; // setting the user id in the req object
//       next();
//     }
//   } catch (error) {
//     return res.status(error.statusCode).json(error);
//   }
// }

// async function isAdmin(req, res, next) {
//   const response = await UserService.isAdmin(req.user); // line 29 provides userId
//   if (!response) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ message: 'User not authorized for this action' });
//   }
//   next();
// }

// function checkRole(role) {
//   return async function (req, res, next) {
//     const userId = req.user;
//     const response = await UserService.getUserByUserId(userId);
//     if (!role.includes(response.role)) {
//       return res
//         .status(StatusCodes.UNAUTHORIZED)
//         .json({ message: 'User not authorized to access this route' });
//     }
//     next();
//   };
// }

// function verifyRole(role) {
//   return function (req, res, next) {
//     if (!role) {
//       return res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ message: 'No role specified for this signin route' });
//     }
//     req.role = role;
//     next();
//   };
// }

// function validateEmailRequest(req, res, next) {
//   // console.log(req.body);
//   if (!req.body.email) {
//     errorResponse.message = 'Something went wrong while authenticating user';
//     errorResponse.error = new AppError(
//       ['Email not found in the incoming request in the correct form'],
//       StatusCodes.BAD_REQUEST
//     );
//     return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
//   }
//   next();
// }

// async function checkAuthReset(req, res, next) {
//   try {
//     const response = await UserService.isAuthenticatedReset(
//       req.params.id,
//       req.params.jwt
//     );
//     // console.log('response of check auth', response);
//     if (response) {
//       req.user = response; // setting the user id in the req object
//       next();
//     }
//   } catch (error) {
//     return res.status(error.statusCode).json(error);
//   }
// }

module.exports = {
  validateAuthRequest,
  // checkAuth,
  // isAdmin,
  // checkRole,
  // verifyRole,
  // validateEmailRequest,
  // checkAuthReset,
};
