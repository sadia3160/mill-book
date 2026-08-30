//crud related routes

import { Router } from "express";
import  { createMilling, getMilling } from "../controllers/milling.controller.js";

const router = Router();

router.route('/create-milling').post(createMilling); 
router.route('/get-milling').get(getMilling);

export default router;
