let express = require("express");
let router = express.Router();


let { countryByContients } = require("../controllers/country");




router.get("/continents/countries", countryByContients)

module.exports = router;