//crud related routes

import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import  { createPurchase, getPurchases, editPurchase, deletePurchase, purchaseSummary } from "../controllers/purchase.controller.js";

const router = Router();

router.route('/create-purchase').post(verifyUser, createPurchase); 
router.route('/get-purchases').get(verifyUser, getPurchases);
router.route('/edit-purchase/:id').put(verifyUser, editPurchase);
router.route('/delete-purchase/:id').delete(verifyUser, deletePurchase);
router.route('/purchase-summary').get(verifyUser, purchaseSummary);

export default router;
