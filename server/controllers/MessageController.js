import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";

export const sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    //   const user = await userModel.findOne({ _id: developerUserId });

    const message = new messageModel({
      sender,
      receiver,
      content,
    });

    await message.save();
    const senderUser = await userModel.findById(sender);
    if (senderUser) {
      // Check if the receiver's user ID is already in the userChats array
      const receiverIndex = senderUser.userChats.indexOf(receiver);
      if (receiverIndex !== -1) {
        // If it's already present, remove it from the array
        senderUser.userChats.splice(receiverIndex, 1);
      }
      // Add the receiver's user ID to the userChats array
      senderUser.userChats.push(receiver);
      await senderUser.save();
    }

    // Update the receiver's user document
    const receiverUser = await userModel.findById(receiver);
    if (receiverUser) {
      // Check if the sender's user ID is already in the userChats array
      const senderIndex = receiverUser.userChats.indexOf(sender);
      if (senderIndex !== -1) {
        // If it's already present, remove it from the array
        receiverUser.userChats.splice(senderIndex, 1);
      }
      // Add the sender's user ID to the userChats array
      receiverUser.userChats.push(sender);
      await receiverUser.save();
    }

    //   await message.populate('sender receiver', 'firstname lastname').execPopulate();

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not send the message" });
  }
};

export const getMessages = async (req, res) => {
  const { loggedInUserId, chatUserId } = req.body;

  try {
    const messages = await messageModel.find({
      $or: [
        { sender: loggedInUserId, receiver: chatUserId },
        { sender: chatUserId, receiver: loggedInUserId },
      ],
    }).sort({ createdAt: "asc" });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve messages" });
  }
};
