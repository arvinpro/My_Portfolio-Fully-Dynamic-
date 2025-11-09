import mongoose from "mongoose";
import { DB_NAME } from "../dbname.js";

export const connectDB = async () => {
    try {
        // Construct the MongoDB URL properly
        const mongoUrl = process.env.MONGODB_URL.endsWith('/')
            ? process.env.MONGODB_URL + DB_NAME
            : process.env.MONGODB_URL + '/' + DB_NAME;
            
        const conn = await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;