const Listing = require("../models/listing.js");
const mapToken = process.env.MAP_TOKEN;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const geocodingClient = mbxGeocoding({ accessToken: mapToken});

module.exports.index = async (req,res)=>{
     const { country } = req.query;

    let allListings;
    if (country && country.trim() !== "") {
        allListings = await Listing.find({
            country: { $regex: new RegExp(country, "i") } // Case-insensitive search
        });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", { allListings });
 }


module.exports.showListing = async (req,res,next)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path : "author"},}).populate("owner");//populating listing with reviews and reviews with author (nested populate)
    if(!listing){
        req.flash("error","Listing not Found");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing} );
}

module.exports.renderNewForm = (req,res)=>{
    res.render('listings/new.ejs');
}

module.exports.createNewListing = async (req,res,next)=>{

   let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
      .send();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;//sets the owner(with their id) by default and owner is the logged in user for that session .
    newListing.image = { url , filename};
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success","New Listing Created");
    res.redirect('/listings');
}

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing not Found");
        res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage= originalImage.replace("/upload","/upload/h_250,w_350");
    res.render('listings/edit.ejs' , {listing,originalImage});
}

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});
    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url , filename};
        await listing.save();
    }
    req.flash("success"," Listing Updated");
    
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success"," Listing Deleted");
    res.redirect('/listings');
}