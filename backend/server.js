const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const CreateUserRoute=require("./routes/CreateUserRoute.js")
const Serachroute=require("./routes/SearchUser.js")
const postsRoute=require("./routes/posts.js")
dotenv.config()
//app config
const app=express()
const port=process.env.PORT || 9000
const connectUrl=`mongodb+srv://admin:${process.env.PASSWORD}@cluster0.yde1grw.mongodb.net/sociomedia?retryWrites=true&w=majority`
//MiddleWares
app.use(express.json())
mongoose.set('strictQuery', true)
app.use(cors())
//db conifg 
mongoose.connect(connectUrl,{
    useNewUrlParser:true
})
// Api endpoints
app.get("/",(req,res)=>{
    res.send("works !")
})
app.use("/createUser",CreateUserRoute)
app.use("/Users",Serachroute)
app.use("/posts",postsRoute)
//Listeners
app.listen(port,()=>{console.log(`listening on port : ${port} `)})