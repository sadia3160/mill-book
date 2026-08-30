import jwt from 'jsonwebtoken';


const verifyUser = ((req,res,next)=>{

    const authHeader = req.headers['authorization'];

     //if authheader exists then get the token
     if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "You don't have access."});
     }
     
     const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "You don't have access."});
    }

    try{
        const verify = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = verify; //store the id in req.id to check later on the controller
        next();
    }
    catch(err){
        return res.status(403).json({message: err.message});
    }

});

export default verifyUser;