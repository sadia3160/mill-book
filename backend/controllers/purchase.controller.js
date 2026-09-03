import { Purchase } from "../models/purchase.model.js";
import { dateRange } from "../utils/date.range.js";


//create
const createPurchase = async (req, res) => {

    try{
        const { 
                purchaseID,
                purchaseDate,
                purchaseDescription,
                purchaseRiceType,
                purchaseQuantity,
                purchaseUnitPrice,
                purchaseTotalCost,
                purchaseSupplierID,
                purchaseOnAccount,
                purchasePaidAmount,
                purchaseDueAmount 
        } = req.body;

        if(!purchaseID || !purchaseDate || !purchaseDescription || !purchaseRiceType || !purchaseQuantity ||
                !purchaseUnitPrice || !purchaseTotalCost || !purchaseSupplierID || !purchaseOnAccount || !purchasePaidAmount || !purchaseDueAmount ){
            return res.status(400).json({message: "Enter all information"});
        }

        const isExists = await Purchase.findOne({purchaseID: purchaseID});
        if(isExists){
            return res.status(400).json({message: "This purchase already exists"});
        }

        const purchase = await Purchase.create({
                purchaseID,
                purchaseDate,
                purchaseDescription,
                purchaseRiceType,
                purchaseQuantity,
                purchaseUnitPrice,
                purchaseTotalCost,
                purchaseSupplierID,
                purchaseOnAccount,
                purchasePaidAmount,
                purchaseDueAmount 
        });
        
        res.status(201).json({
            message: "New purchase added successfully",
            purchase: { 
                id:  purchase._id, 
                purchaseID:  purchase.purchaseID,
                supplierID: purchase.purchaseSupplierID
            }
        });
                

    }
    catch(err){
         res.status(500).json({message: "Internal server error", error: err});
    }
};

//read
const getPurchases = async (req, res) =>{
    try{
            const { purchaseID } = req.query; 
    
            let dataFilter = {id: req.user.id};
            if(purchaseID){ //
                dataFilter.purchaseID = purchaseID;
            }
    
            const purchase = await Purchase.find(dataFilter);
            res.status(200).json(purchase);
        }
        catch(err){
            res.status(500).json({message: "Internal server error", error: err});
        }
};

//edit

const editPurchase = async (req, res) => {
    try{
        const { id } = req.params;
        const { 
                purchaseID,
                purchaseDate,
                purchaseDescription,
                purchaseRiceType,
                purchaseQuantity,
                purchaseUnitPrice,
                purchaseTotalCost,
                purchaseSupplierID,
                purchaseOnAccount,
                purchasePaidAmount,
                purchaseDueAmount 
        } = req.body;

        const newRecord = await Purchase.findByIdAndUpdate(
            id,
            {   purchaseID,
                purchaseDate,
                purchaseDescription,
                purchaseRiceType,
                purchaseQuantity,
                purchaseUnitPrice,
                purchaseTotalCost,
                purchaseSupplierID,
                purchaseOnAccount,
                purchasePaidAmount,
                purchaseDueAmount  },

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

const deletePurchase = async (req, res)=>{
    try{
        const { id } = req.params;
        const del = await Purchase.findByIdAndDelete(id);

        if(!del){
            return res.status(404).json({message: "Data not found"});
        }
        res.status(201).json({message: "Record deleted successfully"});
    }   
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};

const purchaseSummary = async (req, res) => {
    try{
        const { day, month, year } = req.query;
        if(!year){
            return res.status(400).json({message: "Year is required"});
        }
        const { start, end } = dateRange(day,month,year);

        const summary = await Purchase.aggregate([
            { 
                $match : { 
                    purchaseDate : { 
                        $gte : start,
                        $lt : end
                    }
                }
            },

            {
                $group: {
                    _id: null,
                    totalPaidPurchase: { $sum : "$purchasePaidAmount"},
                    totalDuePurchase: { $sum : "$purchaseDueAmount"},
                }
            }
        ]);
        res.status(201).json(summary[0] || { totalPaidPurchase : 0, totalDuePurchase : 0});
    }
    catch(err){
         res.status(500).json({message: "Internal server error", error: err});
    }
};

export {
    createPurchase,
    getPurchases,
    editPurchase,
    deletePurchase,
    purchaseSummary
};