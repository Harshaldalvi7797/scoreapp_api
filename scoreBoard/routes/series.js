let express = require("express");
let router = express.Router();


let { GetSeries ,addLeagues} = require("../controllers/series");

router.post("/series/store",addLeagues)
router.get('/startInterval', function () {
    var timer = setInterval(function () {
        console.log('Interval is running');
    }, 1000);
});

router.get("/series", GetSeries)

module.exports = router;