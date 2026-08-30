
//mongoose sales schema


import mongoose, {Schema} from "mongoose";

const salesSchema = new Schema(
    {

        productName: {
            type: String,
            required: true,
            trim: true
        },

        salesDate: {
            type: Date,
            required: true
        },

        customerInfo: {
            type: String,
            required: true,
            trim: true
        },

         paidSales : {
            type: Number,
            required: true,
            min: 0
        },

        dueSales: {
            type: Number,
            required: true,
            min: 0
        },

        salesTotal : {
            type: Number,
            required: true,
            min: 0
        },
                
    },
    {
        timestamps : true
    }
);


export const Sales = mongoose.model("Sales", salesSchema); 

