//sets up expressJS app and middlewares

import express from "express";

const app = express();  //an express app is created

//parse json req 
app.use(express.json());

//import routes
import userRoute from "../routes/user.route.js";

//declare routes
app.use("/api/v1/user", userRoute);  //all routes of the user will be in userRoute
//ex: http://localhost:5000/api/v1/user/register

export default app;