const mongoose=require("mongoose")
const UsercommentMaker=mongoose.Schema({
    _id:String,
    name:String,
    comment:String,
    picture:String
})
const postSchema=mongoose.Schema({
    userId:String,
    user:String,
    caption:String,
    userPfp:String,
    picture:String,
    likes:Number,
    UsersLikes:[String],
    Location:String,
    comments:[UsercommentMaker]
})
const postmodel=mongoose.model("posts",postSchema,"posts");
module.exports=postmodel