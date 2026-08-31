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
import connectDB from "../config/database.js";


const app = express();  //an express app is created
try {
    await connectDB();
    console.log("MongoDB connected");
} catch (err) {
    console.log(`MongoDB connection failed ${err}`);
}


app.use(cors({origin:process.env.FRONTEND_URL}));


//parse json req 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//import routes
import userRoute from "../routes/user.route.js";
import supplierRoute from "../routes/supplier.route.js";
import purchaseRoute from "../routes/purchase.route.js";
import millingRoute from "../routes/milling.route.js";
import salesRoute from "../routes/sales.route.js";

//declare routes
app.use("/api/v1/user", userRoute);  //all routes of the user will be in userRoute
//ex: http://localhost:5000/api/v1/user/register

app.use("/api/v1/suppliers", supplierRoute); 
app.use("/api/v1/purchases", purchaseRoute); 
app.use("/api/v1/milling", millingRoute); 
app.use("/api/v1/sales", salesRoute); 


export default app;