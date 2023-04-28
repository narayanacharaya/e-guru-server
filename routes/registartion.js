const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../model/userModel");
const mongoose = require ("mongoose");

router.post('/',(req,res,next)=>{

    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            console.log(req.body.password);
            return res.status(500).json({
                message:err
            });
        }
        else{
            User.find({email:req.body.email}).exec().then(users=>{
                if(users.length>=1){
                    console.log("hello there");
                    return res.status(200).json({message:"email is alredy taken"});
                }
                else{
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId,
                        username: req.body.username,
                        password:hash,
                        email:req.body.email,
                        userType:req.body.userType
                    });
                    
                    newUser.save()
                        .then(result => {
                            res.status(200).json({
                                new_user: result
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            });
        }
    });
});

module.exports=router;