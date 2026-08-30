import { Supplier } from "../models/supplier.model.js";


//create
const createSupplier = async (req, res) => {

    try{
        const { supplierID, supplierName, supplierPhone, supplierTotal, paidAmount, dueAmount } = req.body;

        if(!supplierID || !supplierName || !supplierPhone || !supplierTotal || !paidAmount || !dueAmount){
            return res.status(400).json({message: "Enter all information"});
        }

        const isExists = await Supplier.findOne({supplierID: supplierID});
        if(isExists){
            return res.status(400).json({message: "Supplier already exists"});
        }

        const supplier = await Supplier.create({
            supplierID, 
            supplierName,
            supplierPhone, 
            supplierTotal, 
            paidAmount, 
            dueAmount
        });
        
        res.status(201).json({
            message: "New supplier added successfully",
            supplier: { 
                id:  supplier._id, 
                name: supplier.name, 
            }
        });
                

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

//read
const getSuppilers = async (req, res) =>{
    try{
        const supplier = await Supplier.find();
        res.status(200).json(supplier);
    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};

export {
    createSupplier,
    getSuppilers
};