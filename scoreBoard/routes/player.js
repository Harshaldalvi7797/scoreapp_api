let express = require("express");
let router = express.Router();


let {getPlayerById} = require("../controllers/player");







router.get('/getPlayerById',getPlayerById)

module.exports = router;