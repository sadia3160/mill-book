//auth related routes

import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";


const router = Router();

router.route('/register').post(registerUser); //for register route, we added executing method
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);


export default router;
