
const GPU_DATA = {
    "NVIDIA A100": {
        tdp: 400
    },

    "NVIDIA A100 40GB": {
        tdp: 400
    },

    "NVIDIA A100 80GB": {
        tdp: 400
    },

    "NVIDIA H100": {
        tdp: 700
    },

    "NVIDIA H100 SXM": {
        tdp: 700
    },

    "NVIDIA H100 PCIe": {
        tdp: 700
    },

    "NVIDIA H200 SXM": {
        tdp: 700
    },

    "NVIDIA H200 PCIe": {
        tdp: 600
    },

    "NVIDIA L40S": {
        tdp: 350
    },

    "NVIDIA L40": {
        tdp: 350
    },

    "NVIDIA A40": {
        tdp: 300
    },

    "NVIDIA RTX A6000": {
        tdp: 300
    },

    "NVIDIA RTX 6000 Ada": {
        tdp: 300
    },

    "NVIDIA B100": {
        tdp: 700
    },

    "NVIDIA B200": {
        tdp: 1000
    },

    "NVIDIA GB200 NVL72": {
        tdp: 1200
    },

    "NVIDIA RTX 4090": {
        tdp: 450
    },

    "NVIDIA RTX 4080": {
        tdp: 320
    },

    "NVIDIA RTX 4080 SUPER": {
        tdp: 320
    },

    "NVIDIA T4": {
        tdp: 70
    },

    // AMD Instinct accelerators
    "AMD MI100": {
        tdp: 300
    },

    "AMD MI210": {
        tdp: 700
    },

    "AMD MI250X": {
        tdp: 560
    },

    "AMD MI300X": {
        tdp: 750
    },

    "AMD MI300A": {
        tdp: 760
    },

    "AMD MI325X": {
        tdp: 1000
    },

    "AMD MI350X": {
        tdp: 1000
    },

    // Cloud ASICs
    "GOOGLE TPU V5E": {
        tdp: 220
    },

    "GOOGLE TPU V5P": {
        tdp: 280
    },

    "AWS INFERENTIA2": {
        tdp: 250
    },

    "AWS INFERENTIA": {
        tdp: 90
    },

    "AWS TRAINIUM": {
        tdp: 300
    },

    "AWS TRAINIUM2": {
        tdp: 245
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