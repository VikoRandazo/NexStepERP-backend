import mongoose from "mongoose";
import { DB_CONFIG } from "../src/config";

export const connectDB = async () => {
  const uri = `mongodb+srv://${DB_CONFIG.DB_USERNAME}:${DB_CONFIG.DB_PASSWORD}@cluster0.mar81ov.mongodb.net/${DB_CONFIG.DB_NAME}`;
  try {
    await mongoose.connect(uri);
    console.log("success! DB is connected.");
  } catch (error) {
    console.log(error);
  }
};
