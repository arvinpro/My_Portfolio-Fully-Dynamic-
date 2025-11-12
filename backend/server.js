import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import projectRoutes from "./routes/projectRoutes.js";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Define __dirname manually (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ API Routes
app.use("/api/projects", projectRoutes);


// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ✅ Catch-all route: return index.html for React Router paths
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ✅ Health route (optional)
app.get("/", (req, res) => {
  res.send("✅ Backend server running successfully!");
});






// ✅ Start server
const PORT = process.env.PORT || 8989;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
