const mongoose = require('mongoose')
const Schema=mongoose.Schema({
    postId:String,
    picture:Buffer,
    contentType: String,
})
const model=mongoose.model("postPictures,",Schema,"postPictures");
module.exports=model