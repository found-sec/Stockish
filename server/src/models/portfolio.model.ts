import mongoose, { Document, Schema, Model } from "mongoose";

// Define Portfolio interface
export interface IPortfolio extends Document {
  userId: string;
  value: number;
  timestamp: Date;
}

// Define Portfolio schema
export const PortfolioSchema = new Schema<IPortfolio>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Create and export Portfolio model
const Portfolio: Model<IPortfolio> = mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
export default Portfolio;
