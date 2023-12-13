const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");

module.exports.isSignedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please login to perform this task.");
        return res.redirect("/signin");
    }
    next();
}

module.exports.redirectUrlMiddleware = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if( !listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not authorized to perform this request!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isCreator = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.createdBy.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not authorized to delete this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    //Using joi for server side validation
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((msg) => msg.message).join(", ");
        next(new ExpressError(400, errMsg));
    }else{
        next();
    } 
}


//using joi to validate review (reviewSchema with joi defined in schema.js)
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((msg) => msg.message).join(", ");
        next(new ExpressError(400, errMsg));
    }else{
        next();
    }  
}