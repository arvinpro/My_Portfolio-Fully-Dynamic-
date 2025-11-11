import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import multer from "multer";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { router } from "./routes/contact.route.js";
import routers from "./routes/message.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();


const app = express();
const PORT = process.env.PORT;

// ✅ Use correct MongoDB URI variable
const MONGO_URI = process.env.MONGODB_URL || process.env.MONGO_URI;

// MongoDB Model
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  liveLink: String,
  github: String,
  category: String,
  technologies: [String],
  year: String,
  imageUrl: String,
});
const Project = mongoose.model("Project", projectSchema);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/contact", router);
app.use("/api/messages", routers);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Add a simple health route for Render to detect the service
app.get("/", (req, res) => {
  res.send("✅ Backend server is running successfully on Render!");
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact form
app.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const adminHTML = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/> ${message}</p>
    `;
    const userHTML = `
      <h2>Thank you for contacting me!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out. I have received your message and will get back to you shortly.</p>
      <p>Best regards,<br/>Arbin Mahato</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: adminHTML,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: userHTML,
    });

    res.status(200).json({ message: "Emails sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// CRUD for projects
app.post("/api/projects", upload.single("image"), async (req, res) => {
  const data = req.body;
  const project = new Project({
    ...data,
    technologies: data.technologies.split(",").map((t) => t.trim()),
    imageUrl: `/uploads/${req.file.filename}`,
  });
  await project.save();
  res.json(project);
});

app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.put("/api/projects/:id", upload.single("image"), async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;
  updateData.technologies = updateData.technologies
    .split(",")
    .map((t) => t.trim());
  const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });
  res.json(updated);
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.imageUrl) {
      const imagePath = path.join(
        __dirname,
        project.imageUrl.startsWith("/") ? project.imageUrl.slice(1) : project.imageUrl
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Deleted file:", imagePath);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project and image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Connect to DB and start server
connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("DB connection failed:", err));

export { app };
