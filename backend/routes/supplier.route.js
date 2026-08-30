//crud related routes

import { Router } from "express";
import  { createSupplier, getSuppilers } from "../controllers/supplier.controller.js";

const router = Router();

router.route('/create-supplier').post(createSupplier); //save new supplier
router.route('/get-suppliers').get(getSuppilers);

export default router;
