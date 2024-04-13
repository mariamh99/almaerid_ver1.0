import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  getListings
} from "../controllers/listing.controller.js";
import { verifyToken } from "../middleware/jwt.js";

import upload from "../config/multerConfiguration.js"

const router = express.Router();

router.post("/", verifyToken, upload.single('file'),createListing);
router.delete("/:id", verifyToken, deleteListing);
router.get("/single/:id", getListing);
router.get("/", getListings);

export default router;