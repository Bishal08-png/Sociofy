import express from "express";
import NotificationModel from "../Models/NotificationModel.js";

const router = express.Router();

// Get notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await NotificationModel.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Mark as read
router.put("/:id/read", async (req, res) => {
  try {
    await NotificationModel.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json("Notification read.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create notification (internal use or API)
router.post("/", async (req, res) => {
  const newNotif = new NotificationModel(req.body);
  try {
    await newNotif.save();
    res.status(200).json(newNotif);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
