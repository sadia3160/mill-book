//handles login/signup logic

import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


const registerUser = async (req, res) => {
    try{
        const { name, email, password} = req.body;

        //check if all info given
        if( !name || !email || !password){
            return res.status(400).json({message: "Enter all information"});
        }

        
        //check if exists
        const isExists = await User.findOne({email : email.toLowerCase()});
        if(isExists){
            return res.status(400).json({message: "User exists"});
        }


        //create user i.e. register the user if all OK
        const user = await User.create({
            name,
            email : email.toLowerCase(),
            password,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email
            }
        });

    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};


const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
 
        //check if all info given
        if(!email || !password){
            return res.status(400).json({message: "Enter all information"});
        }

        //check if exists
        const user = await User.findOne({
            email : email.toLowerCase(),
        });
        
        if(!user){
            return res.status(400).json({message: "User not found!"});
        }

        //check password
        const isSame = await bcrypt.compare(password, user.password);
        if(!isSame) return res.status(400).json({message: "Invalid credentials."});

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        );

        res.status(201).json({
            message: "User logged in!",
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                token: token
            }
        });
    }
    catch(err){
         res.status(500).json({message: "Internal server error", error: err});
    }
};

const logoutUser = async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({email: email.toLowerCase()});

        if(!user) return res.status(404).json({message: "User not found!"});

        res.status(200).json({
            message: "Successfully logged out!",
        });
    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};


const changePassUser = async (req, res)=>{
    try{
        const {email, password, newPassword} = req.body;

       // const user = await User.findOne({email : email.toLowerCase()});

        //if(!user) return res.status(404).json({message: 'User not found!'});

        const id = req.user.id || req.user._id;
        if(!id){
            return res.status(404).json({message: 'User ID not found!'});
        }
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message: 'User not found!'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect password"}); //user is not authenticated
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({message:'Password Changed!'});
    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};

export{
    registerUser,
    loginUser,
    logoutUser,
    changePassUser
};


/*
    req recieved in app.js 
    ->
    routes checks the url path and method
    ->
    controller does the task that was requested
    ->
    response sent after that
*/

