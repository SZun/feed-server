import Meal from '../models/Meal';
import mapValidationErrors from '../utils/validation/mapValidationErrors';
import validation from '../validation/meals';

const controller = {
  async getUserMeals(req, res) {
    try {
      const userMeals = await Meal.find({ user: req.user._id });
      return userMeals
        ? res.status(200).send(userMeals)
        : res.status(404).send({ error: 'No meals for user found' });
    } catch ({ message }) {
      return res.status(500).send({ error: message });
    }
  },
  async createOne(req, res) {
    try {
      const errors = mapValidationErrors(validation(req.body));
      if (errors) return res.status(400).send(errors);

      const meal = await new Meal({
        meal: req.body.meal,
        user: req.user._id
      }).save();

      return meal
        ? res.status(200).send(meal)
        : res.status(500).send({ error: 'Something went wrong' });
    } catch ({ message }) {
      return res.status(500).send({ error: message });
    }
  },
  async deleteOne({ params }, res) {
    try {
      let meal = await Meal.findByIdAndRemove(params._id, { now: true }).save();
      return meal
        ? res.status(200).send(meal)
        : res.status(404).send({ errors: { user: 'Meal not found' } });
    } catch ({ message }) {
      return res.status(500).send({ error: message });
    }
  }
};

export default controller;
