
const bcryptjs=require("bcryptjs")
const  User =require("../Models/usermodel")
const jwt=require("jsonwebtoken")
const { findOne } = require("../Models/usermodel")
require('dotenv').config()


const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY)
}

const Register=async(req,res)=>{

try{

    let user=await User.findOne({email:req.body.email}).lean().exec()

   

    if(user)
    return res.status(400).send({messege:"there isalready a user with this email "})
   
    
    
    
    user = await User.create(req.body)
       console.log(user,"")
    // console.log(req.body)
          

            const token=newToken(user)

          return res
        .status(201)
        .send({ token, status : 1 })


}

catch(err)
{

res.status(500).send(err)
console.log(err)

}

}




const Login=async(req,res)=>{

try{


    const user=await User.findOne({email:req.body.email}).lean().exec()

     if(!user)
     {
        return res.status(404).send({message:"user or password is not right"})
     }

  const checkPassword=async function (password) {
        return  await bcryptjs.compareSync(password, user.password)
    }
const ispasswordcorect=await checkPassword(req.body.password)

console.log(ispasswordcorect)
if(!ispasswordcorect)
{
    return res
            .status(404)
            .send({ status : 0 })

}

const token = newToken(user)

const updated_user = { 
    id : user._id ,
    email : user.email, 
    token ,
    status : 1
}

res.status(201).send(updated_user)

}


catch(err)
{
console.log(err)

return res.status(500).send(err)



}





}



module.exports={Register,Login}