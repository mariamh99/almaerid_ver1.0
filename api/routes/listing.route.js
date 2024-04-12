import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  getListings
} from "../controllers/listing.controller.js";

import upload from "../config/multerConfiguration.js"

const router = express.Router();

router.post("/", upload.single('file'),createListing);
router.delete("/:id", deleteListing);
router.get("/single/:id", getListing);
router.get("/", getListings);

export default router;