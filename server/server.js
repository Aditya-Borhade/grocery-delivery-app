import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors';
import connectDB from "./configs/db.js";
import 'dotenv/config';
const app=express();

await connectDB();

const port=process.env.PORT || 4000;

const allowedOrigins =['http://localhost:5173']

// middleware configuration 
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))

app.get("/",(req,res)=>{
    res.send("api is working ");
})

app.listen(port,(req,res)=>{
    console.log(`app is running on a port number  ${port}`)
})
