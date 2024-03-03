const mongoose =require('mongoose')

const connectdb=()=>{
    return mongoose.connect(process.env.LIVE_URL)
    .then(()=>{
        console.log("connected successfully");
    }).catch(()=>{
        console.log(err);
    })
}

module.exports=connectdb