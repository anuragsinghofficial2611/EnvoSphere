import asyncHandler from "../utils/asyncHandler.js";
import Calculation from "../models/calculation.model.js";

const getDashboardSummary = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const [summary] = await Calculation.aggregate([
        {
            $match: {
                userId
            }
        },
        {
            $group: {
                _id: null,

                totalCalculations: {
                    $sum: 1
                },

                totalEmissionsKgCO2e: {
                    $sum: "$results.carbonEmissionsKgCO2e"
                },

                totalWaterLiters: {
                    $sum: "$results.waterConsumptionLiters"
                },

                totalEnergyKwh: {
                    $sum: "$results.facilityEnergyKwh"
                },

                totalITEnergyKwh: {
                    $sum: "$results.itEnergyKwh"
                },

                totalHeatKwh: {
                    $sum: "$results.heatGeneratedKwh"
                },

                averagePUE: {
                    $avg: "$pue"
                },

                averageWUE: {
                    $avg: "$wue"
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalCalculations: 1,
                totalEmissionsKgCO2e: 1,
                totalWaterLiters: 1,
                totalEnergyKwh: 1,
                totalITEnergyKwh: 1,
                totalHeatKwh: 1,
                averagePUE: 1,
                averageWUE: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        message: "Dashboard summary fetched successfully",
        data: summary ?? {
            totalCalculations: 0,
            totalEmissionsKgCO2e: 0,
            totalWaterLiters: 0,
            totalEnergyKwh: 0,
            totalITEnergyKwh: 0,
            totalHeatKwh: 0,
            averagePUE: 0,
            averageWUE: 0
        }
    });
});

export {getDashboardSummary};
