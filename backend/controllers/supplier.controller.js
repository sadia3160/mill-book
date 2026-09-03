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
        res.status(500).json({message: "Internal server error", error: err});
    }
};

//read
const getSuppilers = async (req, res) =>{
    try{
            const { supplierID } = req.query; 
    
            let dataFilter = {};
            if(supplierID){ //
                dataFilter.supplierID = supplierID;
            }
    
            const supplier = await Supplier.find({
                id: req.user.id,
                dataFilter,
            });
            res.status(200).json(supplier);
        }
        catch(err){
            res.status(500).json({message: "Internal server error", error: err});
        }
};

//edit

const editSupplier = async (req, res) => {
    try{
        const { id } = req.params;
        const { 
            supplierID, 
            supplierName,
            supplierPhone, 
            supplierTotal, 
            paidAmount, 
            dueAmount
        } = req.body;

        const newRecord = await Supplier.findByIdAndUpdate(
            id,
            {supplierID, 
            supplierName,
            supplierPhone, 
            supplierTotal, 
            paidAmount, 
            dueAmount},
            {new: true, runValidators: true} //get updated data
        );

        if(!newRecord){
            return res.status(404).json({message: "Data not found"});
        }
        res.status(200).json(newRecord);
    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};

const deleteSupplier = async (req, res)=>{
    try{
        const { id } = req.params;
        const del = await Supplier.findByIdAndDelete(id);

        if(!del){
            return res.status(404).json({message: "Data not found"});
        }
        res.status(201).json({message: "Record deleted successfully"});
    }   
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};

export {
    createSupplier,
    getSuppilers,
    editSupplier,
    deleteSupplier
};