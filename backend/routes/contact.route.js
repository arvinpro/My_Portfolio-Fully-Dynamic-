import express from "express";
import Contact from "../models/contact.js";

const contactRouter = express.Router();

// POST contact form
contactRouter.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET all contacts (optional, for admin dashboard)
contactRouter.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE a message by ID (temporary solution)
contactRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ DELETE /api/contact/${id} - Attempting to delete message`);
  
  try {
    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`❌ Invalid ID format: ${id}`);
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const message = await Contact.findById(id);
    if (!message) {
      console.log(`❌ Message not found with ID: ${id}`);
      return res.status(404).json({ message: "Message not found" });
    }

    await message.deleteOne();
    console.log(`✅ Successfully deleted message: ${id}`);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting message:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default contactRouter;
