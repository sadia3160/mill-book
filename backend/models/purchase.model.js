
//mongoose purchase schema

import mongoose, {Schema} from "mongoose";

const purchaseSchema = new Schema(
    {
        purchaseID : {
            type: Number,
            required: true,
            min: 1
        },

        purchaseDate : {
            type: Date,
            required: true,
        },
        
        purchaseDescription: {
            type: String,
            required: true,
            trim: true
        },

         purchaseRiceType : {
            type: String,
            required: true,
            trim: true
        },

        purchaseQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        purchaseUnitPrice : {
            type: Number,
            required: true,
            min: 0
        },
                
        purchaseTotalCost : {
            type: Number,
            required: true,
            min: 0
        },
        
        purchaseSupplierID : {
            type: Number,
            required: true,
            min: 0
        },
        
        purchaseOnAccount : {
            type: String,
            required: true,
            trim: true
        },

        purchasePaidAmount : {
            type: Number,
            required: true,
            min: 0
        },

        purchaseDueAmount : {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps : true
    }
);


export const Purchase = mongoose.model("purchases", purchaseSchema); 

