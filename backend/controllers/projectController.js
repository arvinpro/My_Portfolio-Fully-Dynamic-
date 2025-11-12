import Project from "../models/project.js";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload buffer to Cloudinary using upload_stream (more reliable)
const uploadToCloudinary = async (fileBuffer, mimetype) => {
  if (!fileBuffer) return "";
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "projects",
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          console.log("✅ Upload successful:", result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    // End the stream with the buffer
    uploadStream.end(fileBuffer);
  });
};

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    console.log("📁 File received:", req.file ? {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : "No file");
    
    console.log("📝 Body data:", req.body);

    let imageUrl = "";
    
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    }

    const technologies = req.body.technologies
      ? req.body.technologies.split(",").map((t) => t.trim())
      : [];

    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      liveLink: req.body.liveLink,
      github: req.body.github,
      category: req.body.category,
      technologies,
      year: req.body.year,
      imageUrl,
    });

    const saved = await newProject.save();
    console.log("✅ Project created:", saved._id);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Create project error:", err);
    res.status(500).json({ 
      message: "Server error", 
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// GET PROJECTS
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("❌ Get projects error:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    console.log("📁 Update file received:", req.file ? {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : "No new file");

    let imageUrl = project.imageUrl;
    
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
      console.log("✅ New image uploaded:", imageUrl);
    }

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.liveLink = req.body.liveLink || project.liveLink;
    project.github = req.body.github || project.github;
    project.category = req.body.category || project.category;
    project.technologies = req.body.technologies
      ? req.body.technologies.split(",").map((t) => t.trim())
      : project.technologies;
    project.year = req.body.year || project.year;
    project.imageUrl = imageUrl;

    const updated = await project.save();
    console.log("✅ Project updated:", updated._id);
    res.json(updated);
  } catch (err) {
    console.error("❌ Update project error:", err);
    res.status(500).json({ 
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Optional: Delete image from Cloudinary when deleting project
    if (project.imageUrl) {
      try {
        // Extract public_id from URL
        const urlParts = project.imageUrl.split('/');
        const publicIdWithExt = urlParts[urlParts.length - 1];
        const publicId = `projects/${publicIdWithExt.split('.')[0]}`;
        
        await cloudinary.uploader.destroy(publicId);
        console.log("✅ Image deleted from Cloudinary");
      } catch (cloudinaryErr) {
        console.error("⚠️ Could not delete image from Cloudinary:", cloudinaryErr);
        // Continue with project deletion even if image deletion fails
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    console.log("✅ Project deleted:", req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("❌ Delete project error:", err);
    res.status(500).json({ message: err.message });
  }
};