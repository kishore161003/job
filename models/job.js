import { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
  },
  startDate: {
    type: String,
    required: [true, "Start Date is required!"],
  },
  duration: {
    type: String,
    required: [true, "Duration is required!"],
  },
  salary: {
    type: String,
    required: [true, "Salary is required!"],
  },
  skills: {
    type: Array,
    required: [true, "Skills is required!"],
  },
  postedBy: {
    type: String,
    required: [true, "Posted By is required!"],
  },
  openings: {
    type: Number,
    required: [true, "Openings is required!"],
  },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
