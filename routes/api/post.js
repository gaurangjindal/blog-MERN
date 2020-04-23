const express = require('express');
const router = express.Router();
const Post = require('../../models/post')
const passport = require('passport')
const validatePostInput = require('../../validation/post');

// API 
    //1. CREATE 2. EDIT 3. DELETE 4 .READ 

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
    .catch(err=>res.status(400).json({author:`error fetching author `}))
});


router.get('/author/"author',(req,res)=>{
    Post.find({author:req.params.author})
        .then(posts =>res.status(200).json(posts))
        .catch(err=> res.status(400).json({author:`error while fetching post `}))
})


router.post("/create",passport.authenticate("jwt", { session: false }),
    (req, res) => {
       const author = req.user.user_name;
       const post = req.body;
       const { errors, isValid } = validatePostInput(post);
       if (!isValid) {
          return res.status(400).json(errors);
       }
       post.author = author;
       const newPost = new Post(post);
       newPost
          .save()
          .then(doc => res.json(doc))
          .catch(err => console.log({ create: "Error creating new post" }));
    }
 );

 // updating the post
 router.patch('/update/:id',passport.authenticate('jwt',({session:false}),(req,res)=>{
     const author = req.user.user_name;
     const {errors,isvalid} = validatePostInput(req.body);
     if(!isvalid){
         return res.status(400).json(error);
     }
     const {title,body} = req.body;
     Post.findOneAndUpdate({author,_id:req.params.id},{$set:{title,body}},{new:true})
        .then(doc=>res.status(200).json(doc))
        .catch(err=> res.status(400).json({update:'error in updating post'}))
 }))

router.delete('/delete/:id',passport.authenticate({session:false}),(req,res)=>{
    const author = req.user.user_name;
    Post.findOneAndDelete({author,_id:req.params.id})
    .then(docs=> res.status(200).json(doc))
    .catch(err=>res.status(400).json({delete:'error in deleting post'}))
})



module.exports = router;