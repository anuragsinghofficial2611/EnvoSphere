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
    renewableEnergy,
    pue,
    wue
}) => {
    const gpu = GPU_DATA[gpuModel];

    if (!gpu) {
        throw new Error(`Unsupported GPU model: ${gpuModel}`);
    }
    const totalGpuPowerWatts = gpu.tdp * gpuCount;
    const totalGpuPowerKW = totalGpuPowerWatts / 1000;
    const itEnergyKWh = totalGpuPowerKW * hoursUsed;
    const facilityEnergyKWh = itEnergyKWh * pue;
    const renewableEnergyKWh = facilityEnergyKWh * (renewableEnergy / 100);
    const gridEnergyKWh = facilityEnergyKWh - renewableEnergyKWh;
    const carbonIntensity = 0.72;
    const co2EmissionsKg = gridEnergyKWh * carbonIntensity;
    const heatBTUPerHour = totalGpuPowerKW * 3412.142;
    const waterConsumptionLitres = itEnergyKWh * wue;

    const energyIntensityKWhPerM2 = facilityArea > 0 ? facilityEnergyKWh / facilityArea : 0;
    const carbonIntensityKgPerM2 = facilityArea > 0 ? co2EmissionsKg / facilityArea : 0;

    return {
        gpu: {
            model: gpuModel,
            tdpWatts: gpu.tdp,
            count: gpuCount,
            totalPowerWatts: totalGpuPowerWatts,
            totalPowerKW: totalGpuPowerKW
        },

        energy: {
            itEnergyKWh: itEnergyKWh,
            facilityEnergyKWh: facilityEnergyKWh,
            renewableEnergyKWh: renewableEnergyKWh,
            gridEnergyKWh: gridEnergyKWh
        },

        emissions: {
            carbonIntensityKgPerKWh: carbonIntensity,
            co2EmissionsKg: co2EmissionsKg
        },

        heat: {
            heatBTUPerHour: heatBTUPerHour
        },

        water: {
            wue: wue,
            waterConsumptionLitres: waterConsumptionLitres
        },

        efficiency: {
            pue: pue,
            energyIntensityKWhPerM2:
                energyIntensityKWhPerM2,

            carbonIntensityKgPerM2:
                carbonIntensityKgPerM2
        }
    };
};


export default calculateEnvironmentalImpact;