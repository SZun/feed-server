import Joi from 'joi';
import regex from '../utils/Regex';

const validation = {
  login: {
    email: Joi.string()
      .regex(regex.email)
      .required(),
    password: Joi.string()
      .min(8)
      .max(26)
      .regex(regex.password)
      .required()
  },
  register: {
    name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    email: Joi.string()
      .regex(regex.email)
      .required(),
    password: Joi.string()
      .min(8)
      .max(26)
      .regex(regex.password)
      .required(),
    confirmPassword: Joi.string()
      .min(8)
      .max(26)
      .regex(regex.password)
      .valid(Joi.ref('password'))
      .required()
  }
};
const validateUser = (user, schema) => {
  return Joi.validate(user, validation[schema], { abortEarly: false });
};

export default validateUser;
