const express=require("express");
const port=8000;
const bodyParser=require("body-parser");
const path = require("path");
const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("front"));

mongoose.connect('mongodb://localhost:27017/yourDatabaseName')
 
// registration schema
const registerSchema=({
    name:String,
    email:String,
    password:String
})

// register model

const registration=mongoose.model("Register",registerSchema);

app.use(bodyParser.json());

app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname,"front","login.html"))
})

app.post('/log',async(req,res)=>{
    try{
       const {username,email,password}=req.body;

        const isExist= await  registration.findOne({email:email})
     if(!isExist){
        const RegisterData = new registration({
            name: username,
            email: email,
            password: password
        });
     await RegisterData.save();
     res.redirect('/mainPage');
    }
    else{
        console.log("already exist")
        res.redirect('/error')
    }
   }
    catch(error){
        console.error(error);
    }
    
})

app.get('/mainPage',(req,res)=>{
    res.sendFile(path.join(__dirname,"front","typing.html"))
})

app.listen(port,()=>{
    console.log(`server is running on the http://localhost:${port}`)
})