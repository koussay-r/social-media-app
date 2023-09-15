const mongoose=require("mongoose")
const friendListSchema=mongoose.Schema({
    _id:String,
    name:String,
    pfp:String,
    Occupation:String
})
const CreateUserSchema=mongoose.Schema(({
    name:String,
    Location:String,
    Occupation:String,
    email:String,
    password:String,
    pfp:String,
    likeCount:Number,
    friendsList:[friendListSchema],
    friendsListIds:[String],
    freindRequest:[String]
}))
const CreateUsermodel=mongoose.model("users",CreateUserSchema,"users")
module.exports=CreateUsermodel