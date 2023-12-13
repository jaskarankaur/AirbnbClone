
const mongoose = require("mongoose");
const reviews = require("./reviews");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

let defaultLink = "https://media.blogto.com/articles/20201028-brampton-mansion88.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70";
const listingSchema = new Schema({
    title : {
        type: String, 
        required: true
    },
    description : {
        type: String
    },
    image : {
        type: String, 
        default: defaultLink,
        set: (v) => v===""? defaultLink: v
    },
    price : {
        type: Number
    },
    location : {
        type: String
    },
    country : {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId, 
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }   
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;