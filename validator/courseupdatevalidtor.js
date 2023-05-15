const Joi = require("joi")
const validator = Joi.object({
    category: Joi.string().required(),
    name: Joi.string().required(),
    topics: Joi.array().min(1).items(
      Joi.object({
        name: Joi.string().required(),
        vedios: Joi.array().min(1).items(
          Joi.object({
            title: Joi.string().required(),
            url: Joi.string().uri().required()
          })
        ).required(),
        description: Joi.string().required(),
        // quiz: Joi.string().required()
      })
    ).required()
  });
  const coursevalidator = (req, res, next) => {
    const { error } = validator.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
  module.exports = coursevalidator;