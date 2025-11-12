import express from "express";
import multer from "multer";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectController.js";

const projectRouter = express.Router();
const storage = multer.memoryStorage(); // store file in memory
const upload = multer({ storage });

projectRouter.post("/", upload.single("image"), createProject);
projectRouter.get("/", getProjects);
projectRouter.put("/:id", upload.single("image"), updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
