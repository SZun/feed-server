import User from '../models/User';
import _ from 'lodash';
import createToken from '../utils/Auth/createToken';
import verifyPassword from '../utils/Auth/validatePassword';
import mapValidationErrors from '../utils/validation/mapValidationErrors';
import validateUser from '../validation/users';
import encryptPassword from '../utils/Auth/encryptPassword';

// Consider creating user utils for pick

const controller = {
  async register({ body }, res) {
    try {
      const errors = mapValidationErrors(validateUser(body, 'register'));
      if (errors) return res.status(400).send(errors);

      const { email } = body;
      let user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .send({ errors: { user: 'User Already Exists' } });

      user = new User({ ...body });
      user.password = await encryptPassword(user);
      await user.save();

      user = _.pick(user, ['name', 'email', '_id']);
      return res.status(200).send(user);
    } catch ({ message }) {
      return res.status(500).send({ error: message });
    }
  },
  async login({ body }, res) {
    try {
      const errors = mapValidationErrors(validateUser(body, 'login'));
      if (errors) return res.status(400).send(errors);

      const { email, password } = body;

      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(404)
          .send({ errors: { user: 'User Does Not Exist' } });

      const isValidPwd = await verifyPassword(user, password);
      if (!isValidPwd)
        return res
          .status(400)
          .send({ errors: { password: 'Password Invalid' } });

      user = _.pick(user, ['name', 'email', '_id']);
      return res.status(200).send({ user, token: createToken(user) });
    } catch ({ message }) {
      return res.status(500).send({ error: message });
    }
  },
  async getOne(req, res) {
    try {
      let user = await User.findById(req.user.id);
      if (!user)
        return res.status(404).send({ errors: { user: 'No User Found' } });
      user = _.pick(user, ['name', 'email', '_id']);
      return res.status(200).send(user);
    } catch ({ message }) {
      return res.status(500).send({ error: message });
    }
  },
  async deleteOne(req, res) {
    try {
      let user = await User.findByIdAndRemove(req.user._id, { now: true });
      if (!user)
        return res.status(404).send({ errors: { user: 'No User Found' } });
      await user.save();
      user = _.pick(user, ['name', 'email', '_id']);
      return res.status(200).send(user);
    } catch ({ message }) {
      return res.status(500).send({ error: message });
    }
  },
  async updateOne(req, res) {
    try {
      const errors = mapValidationErrors(validateUser(req.body, 'login'));
      if (errors) return res.status(400).send(errors);

      let user = await User.findByIdAndUpdate(
        req.user._id,
        { email: req.body.email },
        { new: true }
      );
      if (!user)
        return res.status(404).send({ errors: { user: 'No User Found' } });
      user.password = await encryptPassword(user);
      user = _.pick(user, ['name', 'email', '_id']);
      return res.status(200).send(user);
    } catch ({ message }) {
      return res.status(500).send({ error: message });
    }
  }
};

export default controller;
