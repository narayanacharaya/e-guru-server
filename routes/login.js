const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../model/userModel");
const mongoose = require ("mongoose");
const jwt= require("jsonwebtoken")
router.post('/',(req,res)=>{
    User.find({email:req.body.email}).exec().then(users=>{
        if(users.length<1){
            return res.status(404).json({message:"email not found"});
        }
        bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
            if(!result){
               return res.status(401).json({message:"password was incorrect"})
            }
            else{
                        const token= jwt.sign({
                            username:users[0].username,
                            usertype:users[0].usertype,
                            email:users[0].email
                            
                        },'nepali guyz',{expiresIn:"30d"})
                        res.status(200).json({username:users[0].username,
                            usertype:users[0].usertype,
                            email:users[0].email,
                        jwttoken:token})
            }
        })

    }).catch(err=>{
        res.status(500).json({error:err})
    })
})
module.exports=router