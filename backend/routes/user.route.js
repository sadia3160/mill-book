//auth related routes

import { Router } from "express";
import { loginUser, logoutUser, registerUser, changePassUser } from "../controllers/user.controller.js";
import  verifyUser   from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser); //for register route, we added executing method
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

router.route('/changepassword').put(verifyUser, changePassUser); //middleware runs first, then controller


export default router;
