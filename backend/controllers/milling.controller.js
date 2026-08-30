import { Milling } from "../models/milling.model.js";


//create
const createMilling = async (req, res) => {

    try{
        const { 
            purchaseID,
            millingCondition,
            paddyQuantity,
            remainingPaddy,
            riceQuantity,
            byProducts
        } = req.body;

        if(!purchaseID ||
            !millingCondition ||
            !paddyQuantity ||
            !remainingPaddy ||
            !riceQuantity ||
            !byProducts){
            return res.status(400).json({message: "Enter all information"});
        }

        const isExists = await Milling.findOne({purchaseID: purchaseID});
        if(isExists){
            return res.status(400).json({message: "This milling process already exists"});
        }

        const milling = await Milling.create({
                purchaseID,
                millingCondition,
                paddyQuantity,
                remainingPaddy,
                riceQuantity,
                byProducts 
        });
        
        res.status(201).json({
            message: "New milling record added successfully",
            milling: { 
                id:  milling._id, 
                purchaseID:  milling.purchaseID,
                riceQuantity: milling.riceQuantity
            }
        });
                

    }
    catch(err){
         res.status(500).json({message: "Internal server error", error: err});
    }
};

//read
const getMilling = async (req, res) =>{
    try{
        const milling = await Milling.find();
        res.status(200).json(milling);
    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err});
    }
};

export {
    createMilling,
    getMilling
};