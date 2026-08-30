//sets up expressJS app and middlewares

import dotenv from "dotenv";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({
    path: path.resolve(dirname, "../.env")
});

import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from "url";


const app = express();  //an express app is created

app.use(cors({origin:process.env.FRONTEND_URL}));


//parse json req 
app.use(express.json());


//import routes
import userRoute from "../routes/user.route.js";

//declare routes
app.use("/api/v1/user", userRoute);  //all routes of the user will be in userRoute
//ex: http://localhost:5000/api/v1/user/register

export default app;