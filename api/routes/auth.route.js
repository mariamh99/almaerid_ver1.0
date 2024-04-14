import express from "express";
import { register, login, logout, editProfile } from "../controllers/auth.controller.js";
import upload from "../config/multerConfiguration.js";
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.post("/register",upload.single('file'), register)
router.post("/edit",verifyToken,upload.single('file'), editProfile)

router.post("/login", login)
router.post("/logout", logout)

export default router;