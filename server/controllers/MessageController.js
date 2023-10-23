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
