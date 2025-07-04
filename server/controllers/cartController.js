


import User from "../models/User.js";

// update user cartdata
export const updateCart = async(req,res)=>{
   try{
    const {userId, cartItems}  = req.body;
    await User.findByIdAndUpdate(userId, {cartItems});
    res.json({success:true, message: "cart updated"});
   }catch(error){
     console.log(error.message);
     res.json({success:false, message:error.message});
   }
}