import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    liveLink: String,
    github: String,
    category: String,
    technologies: [String],
    year: String,
    imageUrl: String, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
