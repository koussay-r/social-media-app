const mongoose=require("mongoose")
const freindSchema=mongoose.Schema({
    name:String,
    pfp:String,
    occupation:String
})
const CreateUserSchema=mongoose.Schema(({
    name:String,
    LastName:String,
    Location:String,
    Occupation:String,
    email:String,
    password:String,
    pfp:String,
    friendsList:[freindSchema],
    freindRequest:[freindSchema]
}))
const CreateUsermodel=mongoose.model("users",CreateUserSchema,"users")
module.exports=CreateUsermodel