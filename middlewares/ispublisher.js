const jwt = require('jsonwebtoken');

const ispublisher = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token,'nepali guyz',(err, decodedToken) => {
        if (err) {
          console.error(err);
           return  res.json(err)
        } else {
          console.log(decodedToken)
          const userId = decodedToken.id;
          console.log(userId)
          const userCategory = decodedToken.category
          
          if(userCategory=="publisher"){
            console.log(userCategory)
            req.id=userId;
            next();
          }
          else{
           return res.json({"message":"you are not registered as publisher to add course"});
          }
          ;}})

   
};

module.exports = ispublisher;