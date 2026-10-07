import mongoose from "mongoose";

const calculationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        inputs: {
            facilityArea: {
                type: Number,
                required: true,
                min: 0.01,
            },

            gpuModel: {
                type: String,
                required: true,
                trim: true,
            },

            gpuCount: {
                type: Number,
                required: true,
                min: 1,
            },

            hoursUsed: {
                type: Number,
                required: true,
                min: 0.01,
            },

            renewableEnergyPercent: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
            },

            //remove later if i will not take this from user
            pue: {
                type: Number,
                required: true,
                min: 1,
            },

            wue: {
                type: Number,
                required: true,
                min: 0,
            },
        },

        assumptions: {
            gpuTdpWatts: {
                type: Number,
                required: true,
            },

            carbonIntensityKgPerKwh: {
                type: Number,
                required: true,
            },

            carbonIntensitySource: {
                type: String,
                trim: true,
            },

            carbonIntensityYear: {
                type: String,
            },

            // assumption only have to make when user will not give these data
            pueSource: {
                type: String,
                trim: true,
            },

            wueSource: {
                type: String,
                trim: true,
            },
        },
    ]

        results: {
            gpuPowerWatts: {
                type: Number,
                required: true,
            },

            gpuPowerKw: {
                type: Number,
                required: true,
            },

            itEnergyKwh: {
                type: Number,
                required: true,
            },

            facilityEnergyKwh: {
                type: Number,
                required: true,
            },

            renewableEnergyKwh: {
                type: Number,
                required: true,
            },

            gridEnergyKwh: {
                type: Number,
                required: true,
            },

            co2EmissionsKg: {
                type: Number,
                required: true,
            },

            heatKw: {
                type: Number,
                required: true,
            },

            heatBtuPerHour: {
                type: Number,
                required: true,
            },

            waterConsumptionLitres: {
                type: Number,
                required: true,
            },

            energyIntensityKwhPerM2: {
                type: Number,
                required: true,
            },

            carbonIntensityKgPerM2: {
                type: Number,
                required: true,
            },
        }

        // calculationVersion: {
        //     type: String,
        //     default: "1.0",
        // },
    },
    {
        timestamps: true,
    }
);

const Calculation = mongoose.model(
    "Calculation",
    calculationSchema
);

export default Calculation;