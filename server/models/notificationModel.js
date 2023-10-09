// Create a Notification Schema (models/notification.js)
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requesterUserName: {
    type: String,
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
  },
  projectName: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isRequest: {
    type: Boolean,
    default: false,
  },
});

const notificationModel = mongoose.model("notifications", notificationSchema);

export default notificationModel;
