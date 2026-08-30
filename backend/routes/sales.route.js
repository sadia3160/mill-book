//crud related routes

import { Router } from "express";
import  { createSales, getSales } from "../controllers/sales.controller.js";

const router = Router();

router.route('/create-sales').post(createSales); 
router.route('/get-sales').get(getSales);

export default router;
