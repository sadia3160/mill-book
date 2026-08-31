//crud related routes

import { Router } from "express";
import  { createSupplier, getSuppilers, editSupplier, deleteSupplier } from "../controllers/supplier.controller.js";

const router = Router();

router.route('/create-supplier').post(createSupplier); //save new supplier
router.route('/get-suppliers').get(getSuppilers);
router.route('/edit-supplier/:id').put(editSupplier);
router.route('/delete-supplier/:id').delete(deleteSupplier);

export default router;
