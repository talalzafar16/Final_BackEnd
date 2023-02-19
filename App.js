const express =require('express');
const app=express();
const PORT= process.env.PORT || 4000;
const cors = require("cors");
const mongoose= require('mongoose');
const router  = require('./routers');
const DBURI = "mongodb+srv://admin:admin@cluster0.6wqjbin.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DBURI).then((res) =>{console.log("mongo DB connected")}).catch((err) =>console.log("DBerr",err))          

app.use(express.json()); 
app.use(cors())     
app.use(router)   
app.listen(PORT, () =>console.log(`Your server is runing on http://localhost:${PORT}`));