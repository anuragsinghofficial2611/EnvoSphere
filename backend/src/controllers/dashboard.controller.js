import asyncHandler from "../utils/asyncHandler.js";
import Calculation from "../models/calculation.model.js";

const getDashboardSummary = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const [summary] = await Calculation.aggregate([
        {
            $match: {
                user: userId
            }
        },
        {
            $group: {
                _id: null,

                totalCalculations: {
                    $sum: 1
                },

                totalEmissionsKgCO2e: {
                    $sum: "$results.co2EmissionsKg"
                },

                totalWaterLiters: {
                    $sum: "$results.waterConsumptionLitres"
                },

                totalEnergyKwh: {
                    $sum: "$results.facilityEnergyKwh"
                },

                totalITEnergyKwh: {
                    $sum: "$results.itEnergyKwh"
                },

                totalRenewableEnergyKwh: {
                    $sum: "$results.renewableEnergyKwh"
                },

                totalGridEnergyKwh: {
                    $sum: "$results.gridEnergyKwh"
                },

                totalHeatKw: {
                    $sum: "$results.heatKw"
                },

                totalHeatBtuPerHour: {
                    $sum: "$results.heatBtuPerHour"
                },

                averagePUE: {
                    $avg: "$inputs.pue"
                },

                averageWUE: {
                    $avg: "$inputs.wue"
                }
            }
        },
        {
            $project: {
                _id: 0,

                totalCalculations: 1,

                totalEmissionsKgCO2e: {
                    $round: ["$totalEmissionsKgCO2e", 2]
                },

                totalWaterLiters: {
                    $round: ["$totalWaterLiters", 2]
                },

                totalEnergyKwh: {
                    $round: ["$totalEnergyKwh", 2]
                },

                totalITEnergyKwh: {
                    $round: ["$totalITEnergyKwh", 2]
                },

                totalRenewableEnergyKwh: {
                    $round: ["$totalRenewableEnergyKwh", 2]
                },

                totalGridEnergyKwh: {
                    $round: ["$totalGridEnergyKwh", 2]
                },

                totalHeatKw: {
                    $round: ["$totalHeatKw", 2]
                },

                totalHeatBtuPerHour: {
                    $round: ["$totalHeatBtuPerHour", 2]
                },

                averagePUE: {
                    $round: [
                        { $ifNull: ["$averagePUE", 0] },
                        2
                    ]
                },

                averageWUE: {
                    $round: [
                        { $ifNull: ["$averageWUE", 0] },
                        2
                    ]
                }
            }
        }
    ]);

    const data = summary ?? {
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
        averageWUE: 0
    };

    return res.status(200).json({
        success: true,
        message: "Dashboard summary fetched successfully",
        data
    });
});

export { getDashboardSummary };