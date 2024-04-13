import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import upload from "../config/multerConfiguration.js";

const router = express.Router();

router.post("/register",upload.single('file'), register)
router.post("/login", login)
router.post("/logout", logout)

export default router;