const express =require('express')
const app =express ()
const dotenv =require('dotenv')
dotenv.config({path:'./.env'})

const web =require('./routes/web')
const fileupload=require('express-fileupload')

const connectdb=require('./db/connectdb')
var cors=require('cors')

connectdb()
app.use(cors()) //for api communication in react

// temp file uploader
app.use(fileupload({useTempFiles:true}))

//for dataget in api
app.use(express.json())


// load route
app.use('/api',web )
//localhost:4000/api

// server created

app.listen(process.env.port,()=>{
    console.log('server is running on localhost:${process.env.PORT }' )
})