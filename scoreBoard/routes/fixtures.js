let express = require("express");
let router = express.Router();
let { body, query } = require("express-validator");


let {getFixturesFromDate, fixtureInfo, fixtureLineUp} = require("../controllers/fixtures");


router.get("/tilltoss/fixtures", getFixturesFromDate)

router.get("/tilltoss/fixtures/info",
[
    query("fixtureId").notEmpty().withMessage("Please enter a valid fixtureId."),

],
fixtureInfo)
router.get("/tilltoss/fixtures/lineup",
[
    query("fixtureId").notEmpty().withMessage("Please enter a valid fixtureId."),

],
fixtureLineUp)
module.exports = router;