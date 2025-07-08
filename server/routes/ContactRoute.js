import express from "express"

import { contact } from "../controllers/contactController.js";

const ContactRouter = express.Router();

ContactRouter.post('/contact-us' , contact)
    

export default ContactRouter;