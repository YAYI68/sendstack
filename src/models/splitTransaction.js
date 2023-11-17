import mongoose from "mongoose";

const SplitRateSchema = new mongoose.Schema({
  SplitType: {
    type: String,
    select: false,
  },
  SplitEntityId: {
    type: String,
  },
  Amount: {
    type: Number,
  },
});

const SplitTransactionSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  Balance: {
    type: Number,
    required: true,
  },
  CustomerEmail: {
    type: String,
    required: true,
    select: false,
  },
  SplitBreakdown: [SplitRateSchema],
});

export const SplitTransactionModel = mongoose.model(
  "SplitTransaction",
  SplitTransactionSchema
);
