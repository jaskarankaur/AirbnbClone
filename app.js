const express = require("express");
const app = express();

const mongoose = require("mongoose");
const port = 3000;
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js")
const Review = require("./models/reviews.js");

main()
.then((res)=>{
    console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnbclone');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "/public")));

app.listen(port, ()=>{
    console.log("Server started at port: ", port);
});

app.get("/", (req, res)=>{
    res.send("I am root");
});

//index(home) route
app.get("/listings", wrapAsync(async (req, res)=>{
    const listings = await Listing.find({});
    res.render("listings/index.ejs", {listings});
}));

//New route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});
}));

const validateListing = (req, res, next) => {
    //Using joi for server side validation
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((msg) => msg.message).join(", ");
        next(new ExpressError(400, errMsg));
    }else{
        next();
    }  
};

//using joi to validate review (reviewSchema with joi defined in schema.js)
const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((msg) => msg.message).join(", ");
        next(new ExpressError(400, errMsg));
    }else{
        next();
    }  
};

//create route
app.post("/listings", validateListing, wrapAsync(async (req, res)=>{
    //let {title, description, image, price, country, location} = req.body;  
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));



//edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

//update route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    res.redirect("/listings");
}));

//reviews
app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${req.params.id}`);
}));

//delete review
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req, res)=>{
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${req.params.id}`);
}));

app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next)=>{
    let {status=500, message="Something went wrong"} = err;
    res.status(status).render("listings/error.ejs", { err });
});
