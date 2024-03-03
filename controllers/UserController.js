const UserModel=require('../models/user')
const bcrypt = require('bcrypt');

const cloudinary=require("cloudinary").v2
 

          
cloudinary.config({ 
  cloud_name: 'dsymuambj', 
  api_key: '242236596141613', 
  api_secret: 'xhYwv-0dJgpOi35w78C-TX32ydw' 
});
class UserController{
        static getalluser=async(req,res)=>{
            try {
                res.send('hello user')
            } catch (error) {
                console.log(error)
            }
        }
        static userinsert=async(req,res)=>{
            try {

                console.log(req.body)
                console.log(req.files.image)
                const imagefile=req.files.image
                const imageupload=await cloudinary.uploader.upload(imagefile.tempFilePath,{
                    folder:'Profileimageapi'
                    
                })
            
                // console.log(req.body)
                const{name,email,password,confirmpassword}=req.body
    
                const user=await UserModel.findOne({email:email})
                // console.log(user)
    
                if(user){
                   res
                   .status(401)
                   .json({status:"failed",message:"this email is already exist"})
    
                }else{
                    if(name&&email&&password&&confirmpassword){
                        if(password==confirmpassword){
                     const hashpassword = await bcrypt.hash(password,10)
                  const result=new UserModel({
                    //model :view
                    name:name,
                    email:email,
                    password:hashpassword,
                    image:{
                        public_id:imageupload.public_id,
                        url:imageupload.secure_url
                    }
                })
                await result.save()
                   res.status(201).jason({
                    status:"success",
                    message:"registration successfully "
                   })
    
                        }
                        else{
                            res
                            .status(401)
                            .json({status:"failed",message:"PASSWORD AND CONFIRM PASSWORD IS DOES NOT MATCH"})
                        }
                      
                    }
                    else{
                        res
                        .status(401)
                        .json({status:"failed",message:"All field required"})
    
    
                    }
                 
    
                }
            } catch (error) {
                console.log(error)
            }
        }
    
        
}
module.exports=UserController