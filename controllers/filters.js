const Listing = require("../models/listing.js");

module.exports.domes = async(req,res)=>{
    const domesListing = await Listing.find({category: "domes"});
    res.render("filters/domes.ejs",{domesListing});
}

module.exports.amazingPools=async(req,res)=>{
    const amazingPoolsListing = await Listing.find({category: "amazing-pools"});
    res.render("filters/amazingPools.ejs",{amazingPoolsListing});
}
module.exports.iconicCities=async(req,res)=>{
    const iconicCitiesListing = await Listing.find({category: "iconic-cities"});
    res.render("filters/iconicCities.ejs",{iconicCitiesListing});
}
module.exports.farms=async(req,res)=>{
    const farmListing = await Listing.find({category: "farm"});
    res.render("filters/farm.ejs",{farmListing});
}
module.exports.camping=async(req,res)=>{
    const campingListing = await Listing.find({category: "camping"});
    res.render("filters/camping.ejs",{campingListing});
}
module.exports.fishing=async(req,res)=>{
    const fishingListing = await Listing.find({category: "fishing"});
    res.render("filters/fishing.ejs",{fishingListing});
}
module.exports.arctic=async(req,res)=>{
    const arcticListing = await Listing.find({category: "arctic"});
    res.render("filters/arctic.ejs",{arcticListing});
}
module.exports.mountains=async(req,res)=>{
    const mountainsListing = await Listing.find({category: "mountains"});
    res.render("filters/mountains.ejs",{mountainsListing});
}
module.exports.trending=async(req,res)=>{
    const trendingListing = await Listing.find({category: "trending"});
    res.render("filters/trending.ejs",{trendingListing});
}
module.exports.rooms=async(req,res)=>{
    const roomsListing = await Listing.find({category: "rooms"});
    res.render("filters/rooms.ejs",{roomsListing});
}
module.exports.castles=async(req,res)=>{
    const castlesListing = await Listing.find({category: "castles"});
    res.render("filters/castles.ejs",{castlesListing});
}
