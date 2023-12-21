
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isSignedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//New route
router.get("/new", isSignedIn , ListingController.renderNewForm);

//index(home) route
router
    .route("/")
    .get(wrapAsync(ListingController.index))
    //create route
    .post(isSignedIn,
        upload.single("listing[image]"),
        validateListing,  
        wrapAsync(ListingController.createListing));

//edit route
router.get("/:id/edit", isSignedIn, isOwner ,wrapAsync(ListingController.renderEditForm));

//show route
router
    .route("/:id")
    .get(wrapAsync(ListingController.showListing))
    //update route
    .put(isSignedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(ListingController.updateListing))
    //delete route
    .delete(isSignedIn, isOwner, wrapAsync(ListingController.deleteListing));

module.exports = router;