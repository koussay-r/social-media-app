const express=require("express")
const dotenv=require("dotenv")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const CreateUsermodel=require("./../models/CreateUserModel.js")
const postModel=require('./../models/postmodel.js')
dotenv.config()


const CreateUserRoute=express.Router()

CreateUserRoute.post("/",async(req,res)=>{
    const plainTextPassword = req.body.password;
bcrypt.hash(plainTextPassword, saltRounds, async(err, hash)=> {
    if (err) {
        console.log(err)
    } else {
        // Store 'hash' in your database
        try{
            const ress=await CreateUsermodel.create({
                name:req.body.name+" "+req.body.LastName,
                Location:req.body.Location,
                Occupation:req.body.Occupation,
                email:req.body.email,
                password:hash,
                pfp:req.body.pfp,
                likeCount:0
              });
            res.status(201).send(ress)
        }
        catch(err){
            console.log(err)
        }
    }
});
})
CreateUserRoute.post("/exist",async(req,res)=>{
    try{
        const ress=await CreateUsermodel.find({email:req.body.email})
        res.status(200).send(ress)
    }catch(err){
        console.log(err)
    }
})
CreateUserRoute.post("/login",async(req,res)=>{
    try {
        const password=await CreateUsermodel.find({email:req.body.email})
        const storedHashedPassword = password[0].password; // Retrieve the stored hashed password from your database
        const loginPassword = req.body.password; // User's login input
        bcrypt.compare(loginPassword, storedHashedPassword, async(err, result) =>{
            if (result === true) {
                // Passwords match
                // Allow the user to log in
                try{
                    const ress=await CreateUsermodel.find({email:req.body.email})
                    res.status(200).send(ress)
                }catch(err){
                    console.log(err)
                }
            } else {
                // Passwords don't match
                // Deny the login attempt
                console.log("error heere")
            }
        });
    } catch (error) {
        console.log(error)
    }

    }

)
CreateUserRoute.post("/CurrentUser",async(req,res)=>{
    try{
        const ress=await CreateUsermodel.find({_id:req.body._id})
        res.status(200).send(ress)
    }catch(err){
        console.log(err)
    }
})
CreateUserRoute.post("/updatePfp/:_id",async(req,res)=>{
    try {
        const ress=await CreateUsermodel.findOneAndUpdate({_id:req.params._id},{pfp:req.body.pfp},{new:true})
        if(!ress){
            res.send({message:false})
        }
        else{
            try {
                const response =await postModel.findOne({userId:req.params._id})
                for (let index = 0; index < response.length; index++) {
                    response[index].userPfp=req.body.pfp
                }
                response.save()
                res.status(200).send({message:true})
            } catch (error) {
                res.status(500).send(error.message)
            }
        }
    } catch (error) {
        
    }
})
module.exports=CreateUserRoute