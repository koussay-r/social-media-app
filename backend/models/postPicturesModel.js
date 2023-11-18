const mongoose = require('mongoose')
const Schema=mongoose.Schema({
    postId:String,
    picture:String,
})
const model=mongoose.model("postPictures,",Schema,"postPictures");
module.exports=model