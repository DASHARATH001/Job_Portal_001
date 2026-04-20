import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Job'
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: "pending"
  }

}, { timestamps: true })

const Application = mongoose.model("Application", applicationSchema)
export default Application;