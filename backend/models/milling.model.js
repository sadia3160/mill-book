
//mongoose milling schema


import mongoose, {Schema} from "mongoose";

const millingSchema = new Schema(
    {
        purchaseID : {
            type: Number,
            required: true,
            min: 1
        },

        millingCondition: {
            type: String,
            required: true,
            trim: true
        },

         paddyQuantity : {
            type: Number,
            required: true,
            min: 1
        },

        remainingPaddy: {
            type: Number,
            required: true,
            min: 0
        },

        riceQuantity : {
            type: Number,
            required: true,
            min: 0
        },
                
        byProducts: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps : true
    }
);


export const Milling = mongoose.model("Milling", millingSchema); 

