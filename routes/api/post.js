const express = require('express');
const router = express.Router();
const Post = require('../../models/post')
const passport = require('passport')
const validatePostInput = require('../../validation/post');

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Post.find({author:req.user.user_name})
        .then(posts=>res.status(200).json(posts))
        .catch(err=>{
            res.status(400)
            .json({user:"error fetching posts fo logged in user"})
        })
}
)
router.get('/post/:id',(req,res)=>{
    Post.find({_id:req.params.id})
    .then(post=>res.status(200).json(post))
    .catch(err=>res.status(400).json({author:"error fetching author"}))
})

module.exports = router;