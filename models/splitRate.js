import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["ONSITE", "REMOTE", "HYBRID"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "CLOSE"],
    default: "ACTIVE",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

export const JobModel = mongoose.model("Job", JobSchema);
