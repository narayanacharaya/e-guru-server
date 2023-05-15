const jwt = require('jsonwebtoken');

const ispublisher = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token,'nepali guyz',(err, decodedToken) => {
        if (err) {
          console.error(err);
           return  res.json(err)
        } else {

          const userId = decodedToken.id;
      
          const userCategory = decodedToken.category
          console.log(decodedToken)
          console.log(userCategory)
          if(userCategory=="publisher"){
           
            req.id=userId;
            next();
          }
          else{
           return res.json({"message":"you are not registered as publisher to add course"});
          }
          ;}})

   
};

module.exports = ispublisher;