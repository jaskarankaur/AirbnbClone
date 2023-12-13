
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isSignedIn, isOwner, validateListing } = require("../middleware.js");

//New route
router.get("/new", isSignedIn ,(req, res)=>{
    res.render("listings/new.ejs");
});

//index(home) route
router.get("/", wrapAsync(async (req, res)=>{
    const listings = await Listing.find({});
    res.render("listings/index.ejs", {listings});
}));

//show route
router.get("/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews", 
        populate: {
            path: "createdBy"
        }})
        .populate("owner");
    if(!listing){
        req.flash("error", "Listing requested does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}));

//create route
router.post("/", isSignedIn, validateListing, wrapAsync(async (req, res)=>{
    //let {title, description, image, price, country, location} = req.body;  
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
}));

//edit route
router.get("/:id/edit", isSignedIn, isOwner ,wrapAsync(async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing requested does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
}));

//update route
router.put("/:id", isSignedIn, isOwner ,validateListing, wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", isSignedIn, isOwner, wrapAsync(async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}));

module.exports = router;