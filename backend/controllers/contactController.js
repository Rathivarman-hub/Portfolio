import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newMessage = await Message.create({ name, email, message });
    res.status(201).json({
      success: true,
      message: "✅ Message received! I will get back to you soon.",
      data: newMessage,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
