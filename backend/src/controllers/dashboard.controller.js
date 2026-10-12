import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import Calculation from "../models/calculation.model.js";

const getDashboardSummary = asyncHandler(async (req, res) => {
    const rawUserId = req.user?._id ?? req.user?.userId;

    if (!rawUserId || !mongoose.isValidObjectId(rawUserId)) {
        console.log("req.user:", req.user);

        return res.status(401).json({
            success: false,
            message: "User ID missing from authentication middleware",
        });
    }

    const userId = new mongoose.Types.ObjectId(
        String(rawUserId)
    );

    const [summary] = await Calculation.aggregate([
        {
            $match: {
                user: userId,
            },
        },
        {
            $group: {
                _id: null,

                totalCalculations: { $sum: 1 },

                totalEmissionsKgCO2e: {
                    $sum: "$results.co2EmissionsKg",
                },

                totalWaterLiters: {
                    $sum: "$results.waterConsumptionLitres",
                },

                totalEnergyKwh: {
                    $sum: "$results.facilityEnergyKwh",
                },

                totalITEnergyKwh: {
                    $sum: "$results.itEnergyKwh",
                },

                totalRenewableEnergyKwh: {
                    $sum: "$results.renewableEnergyKwh",
                },

                totalGridEnergyKwh: {
                    $sum: "$results.gridEnergyKwh",
                },

                totalHeatKw: {
                    $sum: "$results.heatKw",
                },

                totalHeatBtuPerHour: {
                    $sum: "$results.heatBtuPerHour",
                },

                averagePUE: { $avg: "$inputs.pue" },

                averageWUE: { $avg: "$inputs.wue" },

                averageEnergyIntensity: {
                    $avg: "$results.energyIntensityKwhPerM2",
                },

                averageCarbonIntensity: {
                    $avg: "$results.carbonIntensityKgPerM2",
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalCalculations: 1,
                totalEmissionsKgCO2e: 1,
                totalWaterLiters: 1,
                totalEnergyKwh: 1,
                totalITEnergyKwh: 1,
                totalRenewableEnergyKwh: 1,
                totalGridEnergyKwh: 1,
                totalHeatKw: 1,
                totalHeatBtuPerHour: 1,
                averagePUE: { $ifNull: ["$averagePUE", 0] },
                averageWUE: { $ifNull: ["$averageWUE", 0] },
                averageEnergyIntensity: {
                    $ifNull: ["$averageEnergyIntensity", 0],
                },
                averageCarbonIntensity: {
                    $ifNull: ["$averageCarbonIntensity", 0],
                },
            },
        },
    ]);

    return res.status(200).json({
        success: true,
        message: "Dashboard summary fetched successfully",
        data: summary ?? {
            totalCalculations: 0,
            totalEmissionsKgCO2e: 0,
            totalWaterLiters: 0,
            totalEnergyKwh: 0,
            totalITEnergyKwh: 0,
            totalRenewableEnergyKwh: 0,
            totalGridEnergyKwh: 0,
            totalHeatKw: 0,
            totalHeatBtuPerHour: 0,
            averagePUE: 0,
            averageWUE: 0,
            averageEnergyIntensity: 0,
            averageCarbonIntensity: 0,
        },
    });
});

export { getDashboardSummary };