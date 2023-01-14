let express = require("express");
let router = express.Router();


let { countryByContients,getFixtures } = require("../controllers/country");




router.get("/continents/countries", countryByContients)

router.get("/fixtures", getFixtures)

module.exports = router;