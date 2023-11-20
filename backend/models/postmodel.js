const mongoose=require("mongoose")
const UsercommentMaker=mongoose.Schema({
    _id:String,
    name:String,
    comment:String,
    picture:String
})

const notifDetails=mongoose.Schema({
    idPost:String,
    NameReactionMaker:String,
    type:Boolean,/* true if it's a love reaction false if it's a comment */
    numberOfReactions:Number,
    NumberOfComments:Number,
    date:Date

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
    notifications:[notifDetails]
})
const postmodel=mongoose.model("posts",postSchema,"posts");
module.exports=postmodel