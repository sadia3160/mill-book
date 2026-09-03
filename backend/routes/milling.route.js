//crud related routes

import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import  { createMilling, getMilling, editMilling, deleteMilling } from "../controllers/milling.controller.js";

const router = Router();

router.route('/create-milling').post(verifyUser, createMilling); 
router.route('/get-milling').get(verifyUser, getMilling);
router.route('/edit-milling/:id').put(verifyUser, editMilling);
router.route('/delete-milling/:id').delete(verifyUser, deleteMilling);

export default router;
