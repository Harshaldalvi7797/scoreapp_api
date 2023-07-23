
const axios = require("axios")
let allModels = require("../../utilities/allModels");



exports.fixturesScoreLive= async (req,res)=>

{
    console.log("welcome")
      let fixture = await allModels.scoreCard.find({ "createdDate": req.query.search })

    return res.send(fixture)
}
