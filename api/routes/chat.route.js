import express from "express";
import {
  createChat,
  getChats,
  getSingleChat,
  updateChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", getChats);
router.post("/", createChat);
router.get("/single/:id", getSingleChat);
router.put("/:id", updateChat);

export default router;