let express = require("express");
let router = express.Router();


let {getVenueById} = require("../controllers/venue");







router.get('/getVenueById',getVenueById)

module.exports = router;