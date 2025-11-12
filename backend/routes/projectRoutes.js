import express from "express";
import multer from "multer";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();
const storage = multer.memoryStorage(); // store file in memory
const upload = multer({ storage });

router.post("/", upload.single("image"), createProject);
router.get("/", getProjects);
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

export default router;
