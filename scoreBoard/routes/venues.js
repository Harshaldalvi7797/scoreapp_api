let express = require("express");
let router = express.Router();


let { addVenue} = require("../controllers/venue");






router.get('/venue',addVenue)


module.exports = router;