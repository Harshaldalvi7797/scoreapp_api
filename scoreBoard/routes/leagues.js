let express = require("express");
let router = express.Router();


let { addLeagues } = require("../controllers/leagues");




router.post("/leaguesAdd", addLeagues)

module.exports = router;