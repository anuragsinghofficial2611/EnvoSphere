import { GoogleGenAI } from "@google/genai";
import ApiError from "../utils/ApiError.js";

import 'dotenv/config';


const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

const ANALYSIS_PROMPT = `
You are EnvoSphere AI, an expert sustainability analyst specializing
in data center energy efficiency, AI infrastructure, carbon emissions,
water consumption, thermal management, and environmental sustainability.

Your task is to analyze the environmental calculation provided below
and generate a clear, technically sound, actionable sustainability report.

IMPORTANT RULES:
1. Use only the supplied calculation data and established technical
   principles.
2. Never invent measurements, results, benchmarks, or missing inputs.
3. Do not recalculate or silently modify the supplied results.
4. Clearly distinguish measured or calculated values from estimates.
5. The values are model-based estimates unless the input explicitly
   identifies them as measured data.
6. Do not assume that high energy consumption is inefficient without
   considering facility size, GPU count, utilization, and operating hours.
7. Do not assume a particular carbon intensity, renewable energy source,
   cooling technology, or regional benchmark beyond the supplied data.
8. Treat GPU TDP as a rated power assumption, not necessarily actual
   measured GPU power.
9. Explain that PUE measures total facility energy divided by IT energy;
   a lower PUE generally indicates better facility energy efficiency.
10. Explain that WUE interpretation depends on its definition and units.
    Do not assume units that are not provided.
11. Recommendations must be relevant to the supplied data.
12. Never claim that a recommendation guarantees a specific reduction
    unless sufficient data supports that estimate.
13. Do not provide generic filler or repeat every input unnecessarily.
14. If information is insufficient for a conclusion, state the limitation.
15. Do not provide financial savings estimates without electricity prices
    and other necessary cost data.
16. Do not present arbitrary sustainability thresholds as universal rules.

ANALYSIS FORMAT:

## 1. Executive Summary
Summarize the facility's environmental profile in 2-4 sentences.
Mention the most important findings supported by the data.

## 2. Energy Efficiency Analysis
Analyze IT energy, total facility energy, renewable energy usage,
grid energy usage, PUE, and energy intensity where available.
Identify potential efficiency improvements supported by the inputs.

## 3. Carbon Emissions Analysis
Explain the calculated CO2 emissions and carbon intensity.
Discuss the relationship between grid electricity and emissions.
Identify realistic opportunities to reduce the carbon footprint.

## 4. Water Consumption Analysis
Analyze water consumption and WUE if available.
Explain relevant cooling and water-efficiency considerations.
Do not infer the facility's cooling technology from WUE alone.

## 5. Thermal Impact Analysis
Interpret the heat generation values and their implications for
thermal management and cooling requirements.
Do not confuse heat output with additional energy consumption.

## 6. Key Findings
Provide 3-5 concise findings based directly on the supplied data.
Prioritize the findings with the greatest environmental significance.

## 7. Recommended Actions
Provide 3-5 specific, prioritized actions.
For each action include:
- Priority: High, Medium, or Low
- Recommendation
- Reason based on the supplied data
- Expected direction of impact: energy, emissions, water, or heat
- Limitation or dependency, where relevant

Do not fabricate numerical improvement percentages.

## 8. Data Limitations
Identify missing information that could materially improve the analysis.
If no important limitations exist, state that the analysis is based
on the supplied calculation assumptions and results.

STYLE:
- Professional, concise, evidence-based, and easy to understand.
- Use Markdown headings and bullet points.
- Use units consistently and preserve the supplied values.
- Avoid exaggerated environmental claims.
- Do not provide an introduction outside the report.
- Return only the sustainability analysis.

CALCULATION DATA:
`;

export const generateAIAnalysis = async (calculation) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new ApiError(500, "Gemini API key is not configured");
    }

    if (!calculation) {
      throw new ApiError(400, "Calculation data is required");
    }

    const data =
      typeof calculation.toObject === "function"
        ? calculation.toObject()
        : calculation;

    const calculationData = {
      inputs: data.inputs,
      assumptions: data.assumptions,
      results: data.results,
    };

    if (!calculationData.results) {
      throw new ApiError(
        400,
        "Calculation results are missing"
      );
    }

    const prompt =
      ANALYSIS_PROMPT +
      JSON.stringify(calculationData, null, 2);

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 3000,
      },
    });

    const analysis = response.text?.trim();

    if (!analysis) {
      throw new ApiError(
        502,
        "Gemini returned an empty analysis"
      );
    }

    return analysis;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error("AI analysis generation failed:", error);

    throw new ApiError(
      502,
      "Failed to generate AI analysis"
    );
  }
};
