const mongoose=require('mongoose')
//field
const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    
   
    role:{
        type:String,
        default:'User'
    }
},{timestampd:true})

//model
const UserModel=mongoose.model('users',UserSchema)
module.exports=UserModel