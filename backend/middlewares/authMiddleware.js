const jwt=require('jsonwebtoken');
const User=require('../models/User');

const protect=async(req,res,next)=>{
    let Token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            // get token from header
            token=req.headers.authorization.split(' ')[1];

            // verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);

            // get user from token
            req.user =await User.findById(decoded.id).select('-password');

              req.user = decoded;

            next();
        } catch(error){
            return res.status(401).json({ message:'Not authorized, token faild'});
        }
    }else {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
    }
};

module.exports={protect};