
const axios = require("axios")
let allModels = require("../../utilities/allModels");



exports.fixturesScoreLiveCardDateWise = async (req, res) => {
  let fixture = await allModels.scoreCard.find({ "createdDate": req.query.date })

  return res.send({ count: fixture.length, data: fixture })
}

exports.fixtureScoreCard = async (req, res) => {
  let fixture = await allModels.scoreCard.findOne({ "fixtureId": req.query.fixtureId })

  return res.send(fixture)
}

exports.fixturesScoreDetailsBalls = async (req, res) => {

}