const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const post={
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:String,
        requires:true
    },
    date:{
        type:String,
        required:true
    }
};

const PostSchema = new Schema(post);
module.export = mongoose.model("posts",PostSchema);