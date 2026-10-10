import { success } from 'zod';
import userModel from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';

const getUser = asyncHandler( async(req,res) => {
    const userId = req.user.userId;
    if(!userId){
        return res.status(401).json( 
            {
                message: "User is not authenticated"
            }
        );
    }

    const user = await userModel.findById(userId).select("-passwordHash");
        if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    // if(user){
        return res.status(200).json({
            success: true,
            data : user
        });
    
})

export {getUser};