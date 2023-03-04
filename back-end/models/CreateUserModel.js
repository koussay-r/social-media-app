const mongoose=require("mongoose")

const CreateUserSchema=mongoose.Schema(({
    name:String,
    LastName:String,
    Location:String,
    Occupation:String,
    email:String,
    password:String
}))
const CreateUsermodel=mongoose.model("users",CreateUserSchema,"users")
module.exports=CreateUsermodel