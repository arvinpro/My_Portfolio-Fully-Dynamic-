import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db/connect.js";
import contactRouter from "./routes/contact.route.js";
import projectRouter from "./routes/project.routes.js";
import morgan from "morgan";
import messageRouter from "./routes/message.route.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 

// ✅ Connect MongoDB
connectDB();

// ✅ Define __dirname manually (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ API Routes
app.use("/api/projects", projectRouter);
app.use("/api/contact", contactRouter);
app.use("/api/messages", messageRouter);

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
