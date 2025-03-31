const express = require("express");
const router = express.Router();
const listingController = require("../controllers/filters.js");

router.get("/domes", listingController.domes)
router.get("/amazing-pools", listingController.amazingPools )
router.get("/arctic",listingController.arctic )
router.get("/camping", listingController.camping)
router.get("/farms",listingController.farms )
router.get("/mountains", listingController.mountains)
router.get("/iconic-cities",listingController.iconicCities )
router.get("/fishing", listingController.fishing)
router.get("/rooms",listingController.rooms )
router.get("/trending", listingController.trending)
router.get("/castles",listingController.castles)

module.exports = router;