import mongoose from "mongoose";

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "JobNestle",
    });
    console.log("Database connected");
    return connection;
  } catch (error) {
    console.log(error);
  }
};
