
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res)=>{
    let {search, category} = req.query;
    let listings = await Listing.find({});
    if(search){
        let searchCity = await Listing.find({location: search});
        let searchCountry = await Listing.find({country: search});
        listings = [...searchCity, ...searchCountry];
    }  
    if(category){
        let searchCategory = await Listing.find({category: {$in: category}});
        listings = [...searchCategory];
    }
    res.render("listings/index.ejs", {listings});
};

module.exports.showListing = async (req, res)=>{
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
};

module.exports.renderNewForm = (req, res)=>{
    res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      }).send();
    
    //let {title, description, image, price, country, location} = req.body;  
    
    let newListing = new Listing(req.body.listing);
    newListing.image = {url, filename};
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing requested does not exist!");
        res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/h_150,w_230");
    res.render("listings/edit.ejs", {listing, originalUrl});
};


module.exports.updateListing = async (req, res)=>{
    let {id} = req.params;
    let listing =await Listing.findByIdAndUpdate(id, {...req.body.listing});
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      }).send();
    listing.geometry = response.body.features[0].geometry;
    if(typeof(req.file)!=="undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};