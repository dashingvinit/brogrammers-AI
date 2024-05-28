const { Router } = require('express');
const { AuthMiddlewares } = require('../../middlewares/');
const { UserController } = require('../../controllers');
const bodyParser = require('body-parser');

const router = Router();

router.post(
  '/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  UserController.webhooks
);

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
