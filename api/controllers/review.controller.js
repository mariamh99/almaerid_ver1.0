import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Listing from "../models/listing.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    listingId: req.body.listingId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      listingId: req.body.listingId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this listing!")
      );

    //TODO: check if the user purchased the listing.

    const savedReview = await newReview.save();

    await Listing.findByIdAndUpdate(req.body.listingId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ listingId: req.params.listingId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};