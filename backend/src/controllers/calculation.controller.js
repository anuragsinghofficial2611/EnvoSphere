
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Calculation from "../models/calculation.model.js";
import calculateEnvironmentalImpact from "../services/calculation.service.js";
import { generateAIAnalysis } from "../services/ai.service.js";
import AIAnalysis from "../models/ai.model.js";

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

    const aiAnalysis = await generateAIAnalysis(
        {
            inputs,
            assumptions,
            results
        }
    );

    const calculation = await Calculation.create({
        user: userId,
        inputs,
        assumptions,
        results
    });

    const aiAnalysisresult = await AIAnalysis.create({
        calculation: calculation._id,
        user: userId,
        analysis: aiAnalysis
    });
    return res.status(201).json({
        success: true,
        message: "Environmental impact calculated and saved successfully",
        data: {
            ...calculation.toObject(),
            aiAnalysis
        }
    });
});

const getAllCalculation = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError(401, "User authentication required");
    }

    const calculations = await Calculation.find({ user: userId })
        .sort({ createdAt: -1 }).lean();

    const aiAnalyses = await AIAnalysis.find({ user: userId }).lean();
    const analysisMap = new Map(
        aiAnalyses.map(item => [
            item.calculation.toString(),
            item.analysis
        ])
    );

    const data = calculations.map(calculation => ({
        ...calculation,
        aiAnalysis: analysisMap.get(calculation._id.toString()) || null
    }));

    return res.status(200).json({
        success: true,
        count: data.length,
        data
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
    }).lean();
    if (!calculation) {
        throw new ApiError(404, "Calculation not found");
    }
    const AiAnalysis = await AIAnalysis.findOne({ calculation: calculation._id, user: userId }).lean();

    return res.status(200).json({
        success: true,
        data:{ 
            ...calculation,
            aiAnalysis: AiAnalysis?.analysis??null
        }
    });
});

const deleteCalculation = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
        throw new ApiError(401, "User authentication required");
    }
    const aiAnalysis = await AIAnalysis.findOneAndDelete({
        calculation: id,
    });
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