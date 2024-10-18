require("dotenv").config()
const express = require("express")
const app = express()
const authRoute = require("./Router/auth-router")
const connectDB = require("./dbconnect/dbconnect")
const cors = require('cors');
const path = require('path');
require("dotenv").config();
// app.use(cors());
// app.use(cors({
//     origin: ['http://localhost:3000'], // Change this to your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
//     credentials: true
// }));

app.use(cors({
    origin: ['https://crm-protal-frontend.vercel.app/'], // Change this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    credentials: true
}));



app.use(express.json())

//  to get all functionality for image uplaod  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//  to get all functionality of auth-thentication for client and  website 
app.use("/auth", authRoute)


app.get("/", (req, res) =>{
    res.status(200).send("welcome")
})


const PORT =  8000;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running at port: ${PORT}`)
    })  
})
