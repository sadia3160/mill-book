//mongoose supplier schema

import mongoose, {Schema} from "mongoose";

const supplierSchema = new Schema(
    {
        supplierID : {
            type: Number,
            required: true,
            min: 1
        },

        supplierName : {
            type: String,
            required: true,
            trim: true
        },
        
        supplierPhone: {
            type: Number,
            required: true,
            min: 1
        },

        supplierTotal : {
            type: Number,
            required: true,
            min: 0
        },

        paidAmount : {
            type: Number,
            required: true,
            min: 0
        },

        dueAmount : {
            type: Number,
            required: true,
            min: 0
        }
    },

    {
        timestamps : true
    }
);

export const Supplier = mongoose.model("suppliers", supplierSchema); 
