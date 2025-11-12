import express from "express";
import Contact from "../models/contact.js";

const messageRouter = express.Router();

// ✅ GET all messages
messageRouter.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// ✅ DELETE a message by ID
messageRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Contact.findById(id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    await message.deleteOne();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default messageRouter;
