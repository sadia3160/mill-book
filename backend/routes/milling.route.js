//crud related routes

import { Router } from "express";
import  { createMilling, getMilling, editMilling, deleteMilling } from "../controllers/milling.controller.js";

const router = Router();

router.route('/create-milling').post(createMilling); 
router.route('/get-milling').get(getMilling);
router.route('/edit-milling/:id').put(editMilling);
router.route('/delete-milling/:id').delete(deleteMilling);

export default router;
