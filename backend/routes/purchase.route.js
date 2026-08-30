//crud related routes

import { Router } from "express";
import  { createPurchase, getPurchases } from "../controllers/purchase.controller.js";

const router = Router();

router.route('/create-purchase').post(createPurchase); 
router.route('/get-purchases').get(getPurchases);

export default router;
