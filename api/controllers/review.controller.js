import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Listing from "../models/listing.model.js";
import Order from "../models/order.model.js";

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

    const didPurchase = await didUserPurchaseListing(req.userId, req.body.listingId);
    if (!didPurchase)
      return next(
        createError(403, "You can't create a review for a listing you didn't purchase!")
      );

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
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Review deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const didUserPurchaseListing = async (userId, listingId) => {
  const order = await Order.findOne({ userId, listingId });
  return !!order;
};