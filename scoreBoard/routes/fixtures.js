let express = require("express");
let router = express.Router();


let {getFixturesFromDate} = require("../controllers/fixtures");


router.get("/tilltoss/fixtures", getFixturesFromDate)


module.exports = router;