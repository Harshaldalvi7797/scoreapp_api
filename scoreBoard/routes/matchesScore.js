let express = require("express");
let router = express.Router();


let {upcomingMatches,fixturesScoreLive } = require("../controllers/matchesScore");


router.get('/startInterval', function() {
    var timer = setInterval(function() {
        console.log('Interval is running');
    }, 1000);
});

router.get("/fixture/score", fixturesScoreLive)

module.exports = router;