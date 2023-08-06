let express = require("express");
let router = express.Router();


let {fixturesScoreLiveCardDateWise, fixtureScoreCard } = require("../controllers/matchesScore");


router.get('/startInterval', function() {
    var timer = setInterval(function() {
        console.log('Interval is running');
    }, 1000);
});

router.get("/fixtures/live/score", fixturesScoreLiveCardDateWise)

router.get("/fixture/score/card", fixtureScoreCard)

module.exports = router;