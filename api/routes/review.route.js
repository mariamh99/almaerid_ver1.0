import express from "express";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/",  createReview )
router.get("/:chatId", getReviews )
router.delete("/:id", deleteReview)

export default router;