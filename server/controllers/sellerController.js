import jwt from "jsonwebtoken";



export const sellerLogin=async(req,res)=>{
    try{
        const  {email, password} = req.body;

    if(password === process.env.SELLER_PASSWORD && email=== process.env.SELLER_EMAIL){
        const token= jwt.sign({email}, process.env.JWT_SECRET, {expiresIn:"7d"});
        res.cookie('sellertoken' , token,{
           httpOnly:true,
           secure: process.env.NODE_ENV === "production",
           sameSite :  process.env.NODE_ENV === "production" ? 'none' : 'strict',
           maxAge: 24*7*60*60*1000,
       });
        return res.json({success:true, message:'logged in'})
    }else{
         return res.json({success:false, message:'invalid credentials'})
    }
    }catch(error){  
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}

// check auth 
export const issellerAuth=async(req,res)=>{
    try{
      return res.json({success: true});
    }catch(error){
       console.log(error.message);
       res.json({success:false, message:error.message});
    }
}

// logout seller 
export const sellerlogout =async(req,res)=>{
   try{
       res.clearCookie('sellertoken',{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite :  process.env.NODE_ENV === "production" ? 'none' : 'strict',
      });
      res.json({success:true, message:"logged out "});
   }catch(error){
       console.log(error.message);
        res.json({success:false, message:error.message});
   }
}

