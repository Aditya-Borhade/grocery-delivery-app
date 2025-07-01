import express from "express"
import authSeller from '../middlewares/authSeller.js';
import { upload } from "../configs/multer";
import { addProduct, chnageStock, productById, productList } from "../controllers/productController";

const productRouter = express.Router();

productRouter.post("/add" , upload.array([images]), authSeller,addProduct);
productRouter.get("/list", productList);
productRouter.get("/id", productById );
productRouter.post("/stock", authSeller,chnageStock);

export default productRouter;
