import mongoose from "mongoose";

const aiAnalysisSchema = new mongoose.Schema(
  {
    calculation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Calculation",
      required: true,
      unique: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    analysis: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AIAnalysis = mongoose.model(
  "AIAnalysis",
  aiAnalysisSchema
);

export default AIAnalysis;