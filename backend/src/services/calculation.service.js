
const GPU_DATA = {
    "NVIDIA H100": {
        tdp: 700
    },

    "NVIDIA A100": {
        tdp: 400
    },

    "NVIDIA L40S": {
        tdp: 350
    },

    "NVIDIA RTX 6000 Ada": {
        tdp: 300
    },

    "NVIDIA T4": {
        tdp: 70
    }
};

const calculateEnvironmentalImpact = ({
    facilityArea,
    gpuModel,
    gpuCount,
    hoursUsed,
    renewableEnergyPercent,
    pue,
    wue
}) => {
    const renewableEnergy = renewableEnergyPercent;
    const gpu = GPU_DATA[gpuModel];

    if (!gpu) {
        throw new Error(`Unsupported GPU model: ${gpuModel}`);
    }

    // GPU power
    const gpuPowerWatts = gpu.tdp * gpuCount;
    const gpuPowerKw = gpuPowerWatts / 1000;

    // Energy consumption
    const itEnergyKwh = gpuPowerKw * hoursUsed;
    const facilityEnergyKwh = itEnergyKwh * pue;

    // Renewable and grid energy
    const renewableEnergyKwh =
        facilityEnergyKwh * (renewableEnergy / 100);

    const gridEnergyKwh =
        facilityEnergyKwh - renewableEnergyKwh;

    // Carbon emissions
    const carbonIntensityKgPerKwh = 0.72;

    const co2EmissionsKg =
        gridEnergyKwh * carbonIntensityKgPerKwh;

    // Heat output
    const heatKw = gpuPowerKw;
    const heatBtuPerHour = gpuPowerKw * 3412.142;

    // Water consumption
    const waterConsumptionLitres = itEnergyKwh * wue;

    // Facility-area intensities
    const energyIntensityKwhPerM2 =
        facilityArea > 0
            ? facilityEnergyKwh / facilityArea
            : 0;

    const carbonIntensityKgPerM2 =
        facilityArea > 0
            ? co2EmissionsKg / facilityArea
            : 0;

    // Return the exact structure expected by the database model
    return {
        assumptions: {
            gpuTdpWatts: gpu.tdp,
            carbonIntensityKgPerKwh
        },

        results: {
            gpuPowerWatts,
            gpuPowerKw,
            itEnergyKwh,
            facilityEnergyKwh,
            renewableEnergyKwh,
            gridEnergyKwh,
            co2EmissionsKg,
            heatKw,
            heatBtuPerHour,
            waterConsumptionLitres,
            energyIntensityKwhPerM2,
            carbonIntensityKgPerM2
        }
    };
};

export default calculateEnvironmentalImpact;