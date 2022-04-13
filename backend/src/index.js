const express=require("express")
const app=express()
var cors = require('cors')

const mongoose=require("mongoose")


const {Register,Login}=require("./Controllers/usercontroller")

app.use(cors())

const connect=()=>{

mongoose.connect("mongodb+srv://walson:123@cluster0.rz7lo.mongodb.net/test")

}

app.use(express.json())

app.post("/register",Register)
app.post("/login",Login)






app.listen(1080,async()=>{

try{

connect()
console.log("we are listening to 1080")

}
catch(err){

console.log(err)

}

})

