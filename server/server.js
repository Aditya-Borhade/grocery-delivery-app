import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors';
import connectDB from "./configs/db.js";
import 'dotenv/config';
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
const app=express();

await connectDB();
await connectCloudinary();



const port=process.env.PORT || 4000;

const allowedOrigins =['http://localhost:5173']

// middleware configuration 
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))

app.get("/",(req,res)=>{
    res.send("api is working ");
})
app.use('/api/user', userRouter);
app.use('/api/seller',sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);


app.listen(port,(req,res)=>{
    console.log(`app is running on a port number  ${port}`)
})
