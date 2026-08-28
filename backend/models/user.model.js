//mongoose user schema

import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";


//Registration
const userSchema = new Schema(
    {
        name : {
            type: String,
            required: true,
            unique: false,
            minLength: 7,
            maxLenght: 50, 
        },
        
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },

        password : {
            type: String,
            required: true,
            minLength: 7,
            maxLenght: 30
        }
    },
    {
        timestamps : true
    }
);

//save hash password
userSchema.pre("save", async function (next) {

    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

//compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("users", userSchema); 
//here, users is a model of userSchema and User is a class that holds reference of that model