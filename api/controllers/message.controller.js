import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    chatId: req.body.chatId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Chat.findOneAndUpdate(
      { id: req.body.chatId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ chatId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};