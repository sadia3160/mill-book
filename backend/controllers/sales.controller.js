import { Sales } from "../models/sales.model.js";


//create
const createSales = async (req, res) => {

    try{
        const { 
            productName,
            salesDate,
            customerInfo,
            paidSales,
            dueSales,
            salesTotal
        } = req.body;

        if(!productName ||
            !salesDate ||
            !customerInfo ||
            !paidSales ||
            !dueSales ||
            !salesTotal){
            return res.status(400).json({message: "Enter all information"});
        }


        const sales = await Sales.create({
                productName,
                salesDate,
                customerInfo,
                paidSales,
                dueSales,
                salesTotal
        });
        
        res.status(201).json({
            message: "New sales record added successfully",
            sales: { 
                id:  sales._id, 
                paidSales:  sales.paidSales,
                dueSales: sales.dueSales
            }
        });
    }
    catch(err){
         res.status(500).json({message: "Internal server error", error: err});
    }
};

//read
const getSales = async (req, res) =>{
    try{
        const sales = await Sales.find();
        res.status(200).json(sales);
    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};

export {
    createSales,
    getSales
};