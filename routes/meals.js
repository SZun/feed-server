import express from 'express';
import mealsController from '../controllers/Meals';

const router = express.Router();

// @route GET, POST api/v1/meals/
// @desc Get current user's meals
// @desc Add meal
// @access Private
router
  .route('/')
  .get(mealsController.getUserMeals)
  .post(mealsController.createOne);

// @route DELETE api/v1/meals/:id
// @desc Delete one meal by id
// @access Public
router.route('/').delete(mealsController.deleteOne);

export default router;
