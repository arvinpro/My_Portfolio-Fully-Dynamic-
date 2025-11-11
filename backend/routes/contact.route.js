import express from "express";
import Contact from "../models/contact.jscd";

const router = express.Router();

// POST contact form
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET all contacts (optional, for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export {router};
