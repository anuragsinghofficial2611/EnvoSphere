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

                // Total number of calculations
                totalCalculations: {
                    $sum: 1
                },

                // Energy consumption
                totalEnergyKwh: {
                    $sum: {
                        $ifNull: ["$results.facilityEnergyKwh", 0]
                    }
                },

                totalITEnergyKwh: {
                    $sum: {
                        $ifNull: ["$results.itEnergyKwh", 0]
                    }
                },

                totalRenewableEnergyKwh: {
                    $sum: {
                        $ifNull: ["$results.renewableEnergyKwh", 0]
                    }
                },

                totalGridEnergyKwh: {
                    $sum: {
                        $ifNull: ["$results.gridEnergyKwh", 0]
                    }
                },

                // Carbon emissions
                totalEmissionsKgCO2e: {
                    $sum: {
                        $ifNull: ["$results.co2EmissionsKg", 0]
                    }
                },

                // Water consumption
                totalWaterLiters: {
                    $sum: {
                        $ifNull: ["$results.waterConsumptionLitres", 0]
                    }
                },

                // Heat generated (kW)
                totalHeatKw: {
                    $sum: {
                        $ifNull: ["$results.heatKw", 0]
                    }
                },

                // Average efficiency metrics
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

                totalEmissionsKgCO2e: {
                    $round: ["$totalEmissionsKgCO2e", 2]
                },

                totalWaterLiters: {
                    $round: ["$totalWaterLiters", 2]
                },

                totalHeatKw: {
                    $round: ["$totalHeatKw", 2]
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

    const defaultSummary = {
        totalCalculations: 0,
        totalEnergyKwh: 0,
        totalITEnergyKwh: 0,
        totalRenewableEnergyKwh: 0,
        totalGridEnergyKwh: 0,
        totalEmissionsKgCO2e: 0,
        totalWaterLiters: 0,
        totalHeatKw: 0,
        averagePUE: 0,
        averageWUE: 0
    };

    res.status(200).json({
        success: true,
        message: "Dashboard summary fetched successfully",
        data: summary ?? defaultSummary
    });
});

export { getDashboardSummary };