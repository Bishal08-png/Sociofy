import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    userId: { type: String, required: true }, // Recipient
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    type: { 
        type: String, 
        enum: ["follow", "message", "like", "comment"], 
        required: true 
    },
    text: { type: String },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notifications", NotificationSchema);
export default NotificationModel;
