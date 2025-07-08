import express from "express"



import { contact ,contact1} from "../controllers/contactController.js";

const ContactRouter = express.Router();
const router = express.Router();

ContactRouter.post('/save' , contact);
router.post('/send-email',contact1);
    



export { ContactRouter,router};
  