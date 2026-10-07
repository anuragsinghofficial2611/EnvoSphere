import asyncHandler from "../utils/asyncHandler";
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';

const authentication = asyncHandler( async (req,res,next) => {
    const authHeader = req.header.Authorization
    if(!authHeader) return res.status(401).json({message: "user not authenticated"});
    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({message: "User not authenticated"});
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded) return res.status(401).json({message : "Token expired or invalid, you need to login again"});
    req.user_id = decoded.userId;
    next();
});
