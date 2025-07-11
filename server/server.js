import cookieParser from "cookie-parser";
import express, { application } from "express";
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
import { stripeWebhooks } from "./controllers/orderController.js";
import {  router } from "./routes/ContactRoute.js";
const app=express();

await connectDB();
await connectCloudinary();



const port=process.env.PORT || 4000;

const allowedOrigins =['http://localhost:5173','https://grocery-delivery-app-smoky.vercel.app']




// middleware configuration 
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json()); 
app.use(cookieParser()); 

app.post('/stripe', express.raw({type:'application/json'}),stripeWebhooks)


app.get("/",(req,res)=>{
    res.send("api is working ");
})
app.use('/api/user', userRouter);
app.use('/api/seller',sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);
app.use('/api',router)


app.listen(port,(req,res)=>{
    console.log(`app is running on a port number  ${port}`)
})
