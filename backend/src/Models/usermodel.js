

const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs")

const userSchema=new mongoose.Schema({


username:{type:String,required:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true}

})


userSchema.pre('save',async function(next){


if(!this.isModified("password"))
{
    next()
}

this.password =await bcryptjs.hashSync(this.password, 6)
})








               

module.exports= mongoose.model("user",userSchema)
