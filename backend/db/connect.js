import mongoose from "mongoose";
import { DB_NAME } from "../dbname.js";

export const connectDB = async () => {
  try {
    // Construct MongoDB URL correctly
    const mongoUrl = process.env.MONGODB_URL.endsWith('/')
      ? process.env.MONGODB_URL + DB_NAME
      : process.env.MONGODB_URL + '/' + DB_NAME;

    // Connect without deprecated options
    const conn = await mongoose.connect(mongoUrl);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
