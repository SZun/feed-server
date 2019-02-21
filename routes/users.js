import express from 'express';
import usersController from '../controllers/Users';
import auth from '../middleware/auth';

const router = express.Router();

// @route GET, DELETE, PUT api/v1/users/
// @desc Get current user
// @desc Delete current user
// @desc Update current user's password
// @access Private
router
  .use(auth)
  .route('/')
  .get(usersController.getOne)
  .delete(usersController.deleteOne)
  .put(usersController.updateOne);

// @route POST api/v1/users/register
// @desc Register user for an account
// @access Public
router.route('/register').post(usersController.register);

// @route POST api/v1/users/login
// @desc Log user in to their account
// @access Public
router.route('/login').post(usersController.login);

export default router;
