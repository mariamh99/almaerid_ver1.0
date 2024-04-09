import express from "express";
import {
  createChat,
  getChats,
  getSingleChat,
  updateChat,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.post("/", verifyToken, createChat);
router.get("/single/:id", verifyToken, getSingleChat);
router.put("/:id", verifyToken, updateChat);

export default router;