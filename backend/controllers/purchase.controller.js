import { Purchase } from "../models/purchase.model.js";


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
        const purchase = await Purchase.find();
        res.status(200).json(purchase);
    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};

export {
    createPurchase,
    getPurchases
};