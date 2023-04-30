const Joi = require('joi');

const validtor =Joi.object({
    username:Joi.string().required(),
    email: Joi.string().email().required(),
  password: Joi.string().min(5).max(10).pattern(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,10}$/).required().messages({
    'string.pattern.base': 'Password must be 5-10 characters long and contain at least one special character and one number',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords must match' })
});
const signupvalidtormiddleware=(req,res,next)=>{
    console.log("im called");
    const {error,value} =validtor.validate(req.body);
    console.log(error);
    if(error){
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
          });
    }
    else{
        res.send("everyting is all right ")
    }
}
module.exports = signupvalidtormiddleware;