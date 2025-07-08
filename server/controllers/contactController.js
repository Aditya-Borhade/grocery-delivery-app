import Contact from "../models/Contact.js";

export const contact=async(req,res)=>{
    
    try{
        const {name,email,subject,message} = req.body;
    
        const newContact = new Contact({
            name,email,subject,message
        });
        await newContact.save();
        res.json({success:true ,message:"Contact saved successfully"});
    }catch(error){
        res.json({success:false,message:error.message});
    }


}