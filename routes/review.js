
const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const { validateReview, isSignedIn, isCreator } = require("../middleware.js");
const ReviewController = require("../controllers/reviews.js");


//reviews
router.post("/", isSignedIn, validateReview, wrapAsync(ReviewController.createReview));

//delete review
router.delete("/:reviewId", isSignedIn, isCreator, wrapAsync(ReviewController.deleteReview));

module.exports = router;