//starts the server

import dotenv from "dotenv";
import connectDB from "../config/database.js";
import app from "./app.js";

dotenv.config({
    path: "./.env" 
});

const startServer = async () =>{
    try{
        await connectDB();

        app.on("error", (err) => {      //whenever error event occurs in the application, it catches it
            console.log(`ERROR ${err}`);
            throw err;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on PORT ${process.env.PORT}...`);
        });
    }
    catch(err){
        console.log(`MongoDB connection failed ${err}`);
    }
}

startServer();