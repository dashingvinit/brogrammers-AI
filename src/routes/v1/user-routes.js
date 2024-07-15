const { Router } = require('express');
const { AuthMiddlewares } = require('../../middlewares/');
const { UserController } = require('../../controllers');
const bodyParser = require('body-parser');

const router = Router();

router.get('/:userId', UserController.getUser);

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

router.patch('/subscription/deactivate', UserController.updateSubscription);
router.patch('/:userId/:courseId', UserController.updateRecent);
router.patch('/continue/:userId/:blogId', UserController.updateContinue);
router.patch('/bookmark/:userId/:blogId', UserController.updateBookmarked);

module.exports = router;
