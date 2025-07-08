import Contact from "../models/Contact.js";
import nodemailer from 'nodemailer';

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


export const contact1 = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    let mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Email failed to send' });
  }
};
