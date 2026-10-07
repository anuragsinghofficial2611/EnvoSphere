import asyncHandler from "../utils/asyncHandler";
import jwt from 'jsonwebtoken';

const authentication = asyncHandler( async (req,res,next) => {
    const authHeader = req.header("Authorization");
    if(!authHeader) return res.status(401).json({message: "user not authenticated"});
    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({message: "User not authenticated"});
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user_id = decoded.userId;
    next();
});
