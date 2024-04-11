import createError from "../utils/createError.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

export const createChat = async (req, res, next) => {
  const seller= await User.findOne({_id:req.body.to});
  const newChat = new Chat({
    id: req.body.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.body.isSeller ? req.userId : req.body.to,
    sellerName:seller.username,
    buyerName:req.body.buyerName,
    buyerId: req.body.isSeller ? req.body.to : req.userId,
    readBySeller: req.body.isSeller,
    readByBuyer: !req.body.isSeller,
  });

  try {
    const savedChat = await newChat.save();
    res.status(201).send(savedChat);
  } catch (err) {
    next(err);
  }
};

export const updateChat = async (req, res, next) => {
  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedChat);
  } catch (err) {
    next(err);
  }
};

export const getSingleChat = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({ id: req.params.id });
    if (!chat) return next(createError(404, "Not found!"));
    res.status(200).send(chat);
  } catch (err) {
    next(err);
  }
};

export const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(chats);
  } catch (err) {
    next(err);
  }
};