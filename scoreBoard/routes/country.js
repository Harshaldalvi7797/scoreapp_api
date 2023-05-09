let express = require("express");
let router = express.Router();


let { countryByContients,getFixtures ,addTeam,fixturesScore} = require("../controllers/country");




router.get("/continents/countries", countryByContients)

router.get("/fixtures", getFixtures)

router.get('/team',addTeam)

router.get("/fixture/score",fixturesScore)

module.exports = router;