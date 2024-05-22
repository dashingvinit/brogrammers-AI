const { Router } = require('express');
const { AuthMiddlewares } = require('../../middlewares/');
const { UserController } = require('../../controllers');

const router = Router();

router.post(
  '/signup',
  AuthMiddlewares.validateAuthRequest,
  UserController.signup
);

router.post(
  '/login',
  AuthMiddlewares.validateAuthRequest,
  UserController.login
);

router.delete('/:id', UserController.deleteUser);

router.patch('/:id', UserController.patchUser);

module.exports = router;
