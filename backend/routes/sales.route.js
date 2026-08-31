//crud related routes

import { Router } from "express";
import  { createSales, editSales, getSales, deleteSales } from "../controllers/sales.controller.js";

const router = Router();

router.route('/create-sales').post(createSales); 
router.route('/get-sales').get(getSales);
router.route('/edit-sales/:id').put(editSales);
router.route('/delete-sales/:id').delete(deleteSales);

export default router;
