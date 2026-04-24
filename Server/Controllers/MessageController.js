import MessageModel from "../Models/MessageModel.js";
import ChatModel from "../Models/ChatModel.js";
import UserModel from "../Models/userModel.js";
import NotificationModel from "../Models/NotificationModel.js";

export const addMessage = async (req, res) => {
  const { chatId, senderId, text, image } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
    image
  });
  try {
    const result = await message.save();
    
    // CREATE NOTIFICATION
    try {
        const chat = await ChatModel.findById(chatId);
        const recipientId = chat.members.find(id => id !== senderId);
        const sender = await UserModel.findById(senderId);
        
        const newNotification = new NotificationModel({
            userId: recipientId,
            senderId: senderId,
            senderName: sender.firstname + " " + sender.lastname,
            type: "message",
            text: text ? (text.length > 30 ? text.substring(0, 30) + "..." : text) : "sent an image"
        });
        await newNotification.save();
    } catch (notifErr) {
        console.log("Notif error:", notifErr);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
