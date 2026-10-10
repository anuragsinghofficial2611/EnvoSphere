
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Calculation from "../models/calculation.model.js";
import calculateEnvironmentalImpact from "../services/calculation.service.js";

const createCalculation = asyncHandler(async (req, res) => {
    const {
        facilityArea,
        gpuModel,
        gpuCount,
        hoursUsed,
        renewableEnergyPercent,
        pue,
        wue
    } = req.body;

    if (
        facilityArea == null ||
        !gpuModel ||
        gpuCount == null ||
        hoursUsed == null ||
        renewableEnergyPercent == null ||
        pue == null ||
        wue == null
    ) {
        throw new ApiError(400, "All calculation inputs are required");
    }
    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError(401, "User authentication required");
    }

    const inputs = {
        facilityArea,
        gpuModel,
        gpuCount,
        hoursUsed,
        renewableEnergyPercent,
        pue,
        wue
    };

    const calculationData = calculateEnvironmentalImpact(inputs);
    const { assumptions, results } = calculationData;

    const calculation = await Calculation.create({
        user: userId,
        inputs,
        assumptions,
        results
    });

    return res.status(201).json({
        success: true,
        message: "Environmental impact calculated and saved successfully",
        data: calculation
    });
});

const getAllCalculation = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError(401, "User authentication required");
    }

    const calculations = await Calculation.find({ user: userId })
        .sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        count: calculations.length,
        data: calculations
    });
});

const getCalculation = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
        throw new ApiError(401, "User authentication required");
    }

    const calculation = await Calculation.findOne({
        _id: id,
        user: userId
    });

    if (!calculation) {
        throw new ApiError(404, "Calculation not found");
    }

    return res.status(200).json({
        success: true,
        data: calculation
    });
});

const deleteCalculation = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
        throw new ApiError(401, "User authentication required");
    }

    const calculation = await Calculation.findOneAndDelete({
        _id: id,
        user: userId
    });

    if (!calculation) {
        throw new ApiError(404, "Calculation not found");
    }

    return res.status(200).json({
        success: true,
        message: "Calculation deleted successfully"
    });
});

export {
    createCalculation,
    getAllCalculation,
    getCalculation,
    deleteCalculation
};