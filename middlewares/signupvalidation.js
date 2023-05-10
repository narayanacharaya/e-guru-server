const Joi = require("joi");

const validator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(5)
    .max(10)
    .pattern(
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,10}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 5-10 characters long and contain at least one special character and one number",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords must match" }),
  category: Joi.string().valid("user", "publisher").required(),
});

const signupValidatorMiddleware = (req, res, next) => {
  const { error } = validator.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = signupValidatorMiddleware;