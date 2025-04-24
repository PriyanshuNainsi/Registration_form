require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("front"));

// // MongoDB connection
// const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aljupxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.connect(mongoURI)
// .then(() => console.log("Connected to MongoDB"))
// .catch(err => console.error("MongoDB connection error:", err));

// // Mongoose schema & model
// const registerSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });

// const Registration = mongoose.model("Register", registerSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "front", "login.html"));
});


app.post('/log', async (req, res) => {
    try {
        console.log(req.body); // Debug incoming data
        const { username, email, password } = req.body;
        // const isExist = await Registration.findOne({ email: email });

        // if (!isExist) {
        //     const RegisterData = new Registration({ name: username, email: email, password: password });
        //     await RegisterData.save();
            res.redirect('/mainPage');
        } 
        catch(error){
            console.error("error not posting");
        }

       }
      );

app.get('/test', (req, res) => {
    res.send("Server is working!");
  });
  
app.get('/mainPage', (req, res) => {
    res.sendFile(path.join(__dirname, "front", "typing.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
  });
  