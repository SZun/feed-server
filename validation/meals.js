import Joi from 'joi';

const validation = meal => {
  const schema = {
    meal: Joi.string()
      .min(3)
      .max(255)
      .required()
  };
  return Joi.validate(meal, schema);
};

export default validation;
