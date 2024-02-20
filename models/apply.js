import mongoose, { Schema, model, models } from "mongoose";

const ApplySchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  jobId: {
    type: String,
    required: [true, "Job Id is required!"],
  },
  coverLetter: {
    type: String,
    required: [true, "Cover letter is required!"],
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required!"],
  },
  resume: {
    type: String,
  },
  status: {
    type: String,
    default: "processing",
  },
});

const Apply = models.Apply || model("Apply", ApplySchema);

export default Apply;
