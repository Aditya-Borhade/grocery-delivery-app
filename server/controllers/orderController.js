import Order from '../models/Order.js';
import Product from '../models/Product.js'
// to placeOrder on COD

export const placeOrderCOD = async (req, res) =>{
    try{
        const {userId , items , address} = req.body;
        if(!address || items.length==0){
            return res.json({success : false , message : "invalid data"});
        }
        // to calculate total price of items
        let amount = await  items.reduce(async(acc , item) =>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity
        },0);

        amount+= Math.floor(amount * 0.02);
        await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType : "COD",
        });
         return res.json({success:true, message: "Order Placed Successfully"});

    }catch(error){
        console.log(error.message);
        return res.json({success:false, message:error.message});
    }
}

// get orders by users Id

export const getUserOrders = async (req, res) =>{
    try{
        const {userId} = req.body;
        const orders = await Order.find({
            userId,
            $or:[{paymentType : "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt : -1});
         res.json({success:true, orders});
    }catch(error){
          res.json({success :false, message : error.message});
    }
}

// get all orders (for admin / seller );

export const getAllOrders = async (req, res) =>{
    try{
        
        const orders = await Order.find({
           $or:[{paymentType : "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt : -1});
         res.json({success:true, orders});
    }catch(error){
          res.json({success :false, message : error.message});
    }
}