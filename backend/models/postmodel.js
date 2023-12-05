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
    withPicture:Boolean,
    likes:Number,
    UsersLikes:[String],
    Location:String,
    comments:[UsercommentMaker],
    ReactionNotifications:[String],
    CommentsNotifications:[String],
})
const postmodel=mongoose.model("posts",postSchema,"posts");
module.exports=postmodel