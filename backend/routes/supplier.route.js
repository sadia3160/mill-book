//crud related routes

import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import  { createSupplier, getSuppilers, editSupplier, deleteSupplier } from "../controllers/supplier.controller.js";

const router = Router();

router.route('/create-supplier').post(verifyUser, createSupplier); //save new supplier
router.route('/get-suppliers').get(verifyUser, getSuppilers);
router.route('/edit-supplier/:id').put(verifyUser, editSupplier);
router.route('/delete-supplier/:id').delete(verifyUser, deleteSupplier);

export default router;
