import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler';

const connectDB = asyncHandler(async () => {
    await mongoose.connect(process.env.MONGO_URI);
} )

export default connectDB;