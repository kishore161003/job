import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email already exists!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  name: {
    type: String,
  },
  image: {
    type: String,
    default: "/defaultuser.png",
  },
  skills: {
    type: Array,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  education: {
    type: String,
  },
  profession: {
    type: String,
  },
  catagory: {
    default: "",
    type: String,
  },
  applied: {
    type: Array,
  },
  posted: {
    type: Array,
  },
  companyName: {
    type: String,
  },
  about: {
    type: String,
  },
  webSite: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
