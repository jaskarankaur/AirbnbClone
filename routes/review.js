
const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const { validateReview, isSignedIn, isCreator } = require("../middleware.js");


//reviews
router.post("/", isSignedIn, validateReview, wrapAsync(async (req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.createdBy = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review added");
    res.redirect(`/listings/${req.params.id}`);
}));

//delete review
router.delete("/:reviewId", isSignedIn, isCreator, wrapAsync(async(req, res)=>{
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted");
    res.redirect(`/listings/${req.params.id}`);
}));

module.exports = router;