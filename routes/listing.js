const express = require("express");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const {isLoggedin,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage }) //for storing through multer

router.route("/")
.get(listingController.index)
.post(isLoggedin,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createNewListing));

//NEW
router.get('/new' ,isLoggedin , listingController.renderNewForm); //new can be treated as an id if declared after id route

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedin, isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedin,isOwner, wrapAsync(listingController.destroyListing));


//Edit
router.get('/:id/edit' ,isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router ;