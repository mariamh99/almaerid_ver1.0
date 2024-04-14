import Listing from "../models/listing.model.js";
import createError from "../utils/createError.js";

export const createListing = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a listing!"));

  const cover = req.file;
  if (!cover) {
    return res.status(400).json({ message: "No cover image uploaded!" });
  }
console.log(req.body)
  const newListing = new Listing({
    ...req.body,

    userId: req.body.userId[1],
    cover: cover.path,
  });
  try {
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    next(err);
  }
};
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (listing.userId !== req.userId)
      return next(createError(403, "You can delete only your listing!"));

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).send("Listing has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) next(createError(404, "Listing not found!"));
    res.status(200).send(listing);
  } catch (err) {
    next(err);
  }
};
export const getListings = async (req, res, next) => {
  const q = req.query;
  console.log(q)
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const listings = await Listing.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(listings);
  } catch (err) {
    next(err);
  }
};
