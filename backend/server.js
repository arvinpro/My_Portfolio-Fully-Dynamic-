import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check
app.get("/", (req, res) => res.send("✅ Backend running"));

// Routes
app.use("/api/projects", projectRoutes);

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
