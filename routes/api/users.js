const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET =process.env.SECRET;
const validateSignupInput = require('../../validation/signup');
const validateSigninInput = require('../../validation/login');
const User = require('../../models/user');


router.post('/signup',(req,res)=>{
    const {errors,isvalid} = validateSignupInput(req.body);
    const {user_name,email,password} = req.body;
    if(!isvalid){
        return res.sendStatus(400).json(errors);
    }
    User.findOne({$or:[{email},{user_name}]}).then(user =>{
        if(user){
            if(user.email === email)
                return res.status(400).json({email:"email already exists"});
            else
                return res
                    .status(400)
                    .json({user_name:"username already exists"});
        }else{
            const newUser = new User({user_name,email,password});

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) 
                        throw err;
                    newUser.password = hash;
                    newUser.save()
                            .then(user =>res.json(user))
                            .catch( err =>console.log({error:'error creating new user'}))
                })
            })
        }
    })

})

router.post('/login',(req,res)=>{
    const{errors,isvalid} = validateSigninInput(req.body);
    if(!isvalid){
        return res.status(400).json(errors);
    }
    const {email,password} = req.body;
    User.find({email}).then(user=>{
        if(!user){
            return res.send(400).json({email:"Email not found"})
        }
        bcrypt.compare(password,user.password).then(isMatch=>{
            if(isMatch){
                const payload ={
                    id:user.id,
                    user_name:user.user_name
                };

                //jwt take 3 parameter 
            //1. payload 2. secret 3. function
                jwt.sign(payload,SECRET,{expiresIn:3600},(err,token)=>{
                    if(err){
                        console.log(err);
                    }
                    return res.json({
                        success:true,
                        token:"Bearer "+token
                    });
                });
            }
            else{
                return res.send(400).json({password:"Password incorrect"});
            }
        })
    })
})

module.exports = router;