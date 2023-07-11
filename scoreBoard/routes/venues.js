let express = require("express");
let router = express.Router();


let {getVenueById, addVenue} = require("../controllers/venue");






router.get('/venue',addVenue)
router.get('/getVenueById',getVenueById)

module.exports = router;