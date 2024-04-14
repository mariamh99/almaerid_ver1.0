import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getReviews,
  deleteReview,
  checkPurchase
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", verifyToken, createReview )
router.get("/:listingId", getReviews )
router.delete("/:id", deleteReview)
router.post("/check", verifyToken, checkPurchase)

export default router;