import Message from "../models/Message.js";
import {
  sendEmailViaGmail,
  createContactEmailBody,
  createConfirmationEmailBody,
} from "../services/gmailService.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save message to DB
    const newMessage = await Message.create({ name, email, message });

    // Send email notification to portfolio owner
    if (process.env.GMAIL_USER) {
      try {
        const emailBody = createContactEmailBody(name, email, message);
        await sendEmailViaGmail(
          process.env.GMAIL_USER,
          `New Contact Form Submission from ${name}`,
          emailBody
        );

        // Send confirmation email to the sender
        const confirmationBody = createConfirmationEmailBody(name);
        await sendEmailViaGmail(email, "Thank you for contacting me!", confirmationBody);
      } catch (emailError) {
        // Log email error but don't fail the API response
        console.error("Email sending error:", emailError.message);
        // Message was still saved to DB, so we return success
      }
    }

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
