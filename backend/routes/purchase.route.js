//crud related routes

import { Router } from "express";
import  { createPurchase, getPurchases, editPurchase, deletePurchase } from "../controllers/purchase.controller.js";

const router = Router();

router.route('/create-purchase').post(createPurchase); 
router.route('/get-purchases').get(getPurchases);
router.route('/edit-purchase/:id').put(editPurchase);
router.route('/delete-purchase/:id').delete(deletePurchase);

export default router;
