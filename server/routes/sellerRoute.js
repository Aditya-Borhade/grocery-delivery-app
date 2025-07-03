

import express from 'express'
import { issellerAuth, sellerLogin, sellerlogout } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter= express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth',authSeller,issellerAuth);
sellerRouter.get('/logout', sellerlogout );

export default sellerRouter;