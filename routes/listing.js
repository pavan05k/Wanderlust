const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn , isOwner,validateListing} = require("../middleware.js");
const multer  = require('multer'); // for uploading files
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.use(express.urlencoded({ extended: true }));

const listingController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingController.index)) //Index Route
  .post(isLoggedIn , validateListing, upload.single('listing[image]') ,wrapAsync(listingController.createListing)); //Create Route
  //  .post( upload.single('listing[image]'),(req,res) => {
  //   res.send(req.file);
  // });
//New Route
router.get("/new", isLoggedIn ,listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))  //Show Route
  .put(isLoggedIn, isOwner , upload.single('listing[image]') ,validateListing, wrapAsync(listingController.updateListing)) //update Route
  .delete(isLoggedIn, isOwner , wrapAsync(listingController.destroyListing)); //Delete Route

//edit route
router.get("/:id/edit",isLoggedIn, isOwner ,wrapAsync(listingController.editListing));

module.exports = router;