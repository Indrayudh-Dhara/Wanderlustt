const express = require("express");
const router = express.Router({mergeParams : true}); //mergeparams to access the parameters from the parent route to this child route
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLoggedin,isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//REVIEWS
router.post("/" ,isLoggedin,validateReview, wrapAsync(reviewController.createReview));

//DELETE REVIEWS
router.delete("/:reviewId",isLoggedin,isAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;