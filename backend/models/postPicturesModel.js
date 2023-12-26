const mongoose = require('mongoose')
const Schema=mongoose.Schema({
    PostOrUserId:String,
    picture:Buffer,
    contentType: String,
})
const model=mongoose.model("Pictures,",Schema,"Pictures");
module.exports=model