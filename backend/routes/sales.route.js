//crud related routes

import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import  { createSales, editSales, getSales, deleteSales, salesSummary } from "../controllers/sales.controller.js";

const router = Router();

router.route('/create-sales').post(verifyUser, createSales); 
router.route('/get-sales').get(verifyUser, getSales);
router.route('/edit-sales/:id').put(verifyUser, editSales);
router.route('/delete-sales/:id').delete(verifyUser, deleteSales);
router.route('/sales-summary').get(verifyUser, salesSummary);

export default router;
