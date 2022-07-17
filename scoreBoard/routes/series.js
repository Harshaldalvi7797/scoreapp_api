let express = require("express");
let router = express.Router();


let { GetSeries } = require("../controllers/series");


router.get('/startInterval', function () {
    var timer = setInterval(function () {
        console.log('Interval is running');
    }, 1000);
});

router.get("/series", GetSeries)

module.exports = router;