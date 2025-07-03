import jwt from "jsonwebtoken"

const authSeller = async(req,res,next)=>{
      console.log("Cookies:", req.cookies);
   const {sellertoken} = req.cookies;
   if(!sellertoken){
       return res.json({success:false, message:"not authorized"});
   }
   try{
       const tokenDecode= jwt.verify(sellertoken, process.env.JWT_SECRET);
       console.log("Token Decoded:", tokenDecode); 
       if( tokenDecode.email === process.env.SELLER_EMAIL){
           next();
       }else{
             return res.json({success:false, message:"not authorized"});
       }
       
     }catch(error){
           res.json({success:false, message:error.message});
     }
}

export default authSeller;
