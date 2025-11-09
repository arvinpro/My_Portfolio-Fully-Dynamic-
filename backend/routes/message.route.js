import express from "express";
import Contact from "../models/contact.js";

const routers = express.Router();

// ✅ GET all messages with pagination
routers.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Contact.countDocuments();
    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // ✅ Always return an array and total
    res.status(200).json({
      success: true,
      messages,
      total,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
});

// ✅ Correct export
export default routers;
