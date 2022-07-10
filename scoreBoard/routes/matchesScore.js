let express = require("express");
let router = express.Router();


let {upcomingMatches } = require("../controllers/matchesScore");

router.get("/matches", upcomingMatches)

module.exports = router;