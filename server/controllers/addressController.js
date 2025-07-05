



import Address from "../models/Adderess.js";

//add address
// export const addAddress = async(req,res)=>{
//    try{
//       const address = req.body.address;
//        const userId = req.user?.id; 

//     if (!address || !userId) {
//         return res.status(400).json({ success: false, message: "Invalid request" });
//     }

//     await Address.create({ ...address, userId });

//     res.json({success: true, message: " Address added successfully"});
//    }catch(error){
//      console.log(error.message);
//      res.json({success: false, message: error.message});
//    }
//   }

export const addAddress = async (req, res) => {
  try {
    const address = req.body.address;
    const userId = req.user?.id;

    // Add logs to check what's missing
    console.log("Received address:", address);
    console.log("Decoded user ID:", userId);

    if (!address || !userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
        debug: { address, userId },
      });
    }

    await Address.create({ ...address, userId });

    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log("Add address error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};







export const getAddress = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const addresses = await Address.find({ userId });
    res.json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



