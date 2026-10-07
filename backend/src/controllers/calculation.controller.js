import asyncHandler from "../utils/asyncHandler.js";
import Calculation from "../models/calculation.model.js";
import calculateEnvironmentalImpact from "../services/calculation.service.js";


const createCalculation = asyncHandler(async (req, res) => {

    const {
        facilityArea,
        gpuModel,
        gpuCount,
        hoursUsed,
        renewableEnergy,
        pue,
        wue
    } = req.body;


    const result = calculateEnvironmentalImpact({
        facilityArea,
        gpuModel,
        gpuCount,
        hoursUsed,
        renewableEnergy,
        pue,
        wue
    });


    const calculation = await Calculation.create({

        user: req.user.id,

        input: {
            facilityArea,
            gpuModel,
            gpuCount,
            hoursUsed,
            renewableEnergy,
            pue,
            wue
        },

        result
    });


    return res.status(201).json({
        success: true,
        message: "Environmental impact calculated successfully",
        data: calculation
    });
});


export {
    createCalculation
};