
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
  try {
    let fixture = await allModels.ballByball.findOne({ fixtureId: req.query.fixtureId })
    // console.log('fixture', fixture)
    if (fixture) {
      return res.send({ data: fixture })

    }
    else {
      console.log("here")
      let response = await axios.get(`https://cricket.sportmonks.com/api/v2.0/fixtures/${req.query.fixtureId}?include=balls&api_token=3YUfERt5oESjf0ioV2at8peahGCvFrSSbJJH2Cjy6pJAJD5Cu7q59wrkI2rA`)
      // console.log(response.data)
      // return res.send(response.data)
      const storeFixtureballs = new allModels.ballByball({
        fixtureId: response.data.data.id,
        resource: response.data.data.resource,
        league_id: response.data.data.league_id,
        season_id: response.data.data.season_id,
        round: response.data.data.round,
        stage_id: response.data.data.stage_id,
        localteam_id: response.data.data.localteam_id,
        visitorteam_id: response.data.data.visitorteam_id,
        starting_at: response.data.data.starting_at,
        type: response.data.data.type,
        live: response.data.data.live,
        status: response.data.data.statuss,
        note: response.data.data.note,
        total_overs_played: response.data.data.total_overs_played,
        balls: response.data.data.balls,
      })
      const data = await storeFixtureballs.save()

      return res.send({ data: data })

    }

  }
  catch (error) {
    console.log(error)

  }
}