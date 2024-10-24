require("dotenv").config()
const express = require("express")
const app = express()
const authRoute = require("./Router/auth-router")
const teamManage = require("./Router/team-leader-router")
const founderManage = require("./Router/founder-router")
const managerManage =  require("./Router/manger-router")
const taskManage =  require("./Router/task-router")
const connectDB = require("./dbconnect/dbconnect")
const cors = require('cors');
const path = require('path');


// app.use(cors());
app.use(cors({
    origin: ['http://localhost:3000'], // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // If you need to handle cookies or session tokens
}));



app.use(express.json())

//  to get all functionality for image uplaod  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/teamManage", teamManage)

app.use("/founderManage", founderManage)

app.use("/managerManage", managerManage)

app.use("/taskManage", taskManage)

// auth 
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
