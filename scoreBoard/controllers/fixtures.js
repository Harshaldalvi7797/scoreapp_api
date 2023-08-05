let allModels = require("../../utilities/allModels");
const axios = require("axios");
const { validationResult } = require('express-validator');
const moment = require("moment")
exports.getFixturesFromDate = async (req, res) => {
    let fixture = await allModels.newFixtures.find({ startingAt: req.query.starting_at })
    const response = []
    for (let index = 0; index < fixture.length; index++) {
        const element = fixture[index];
        let leagues = await allModels.leagues.findOne({ LeagueId: element.league_id })
        let teamV = await allModels.team.findOne({ teamId: element.visitorteam_id })
        let teamL = await allModels.team.findOne({ teamId: element.localteam_id })
        //const istTimestamp = moment.utc(element.starting_at).utcOffset('+05:30').format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
        const istTimestamp = moment.utc(element.starting_at).tz('Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
        const dateComponent = moment.utc(element.starting_at).format('YYYY-MM-DD');
        const timeComponent = moment.utc(element.starting_at).tz('Asia/Kolkata').format('h:mm:ss.SS A');
        const fixtureResponse =
        {
            fixtureId: element.fixtureId,
            league_id: element.league_id,
            season_id: element.season_id,
            leagueName: leagues.leagueName,
            round: element.round,
            localteam_id: element.localteam_id,
            localteamName: teamL.name,
            localteamFlag: teamL.image_path,
            visitorteam_id: element.visitorteam_id,
            visitorteamFlag: teamV.image_path,
            visitorteamName: teamV.name,
            starting_at: (element.starting_at),
            matchDate: dateComponent,
            matchISTTime: timeComponent
        }
        response.push(fixtureResponse)
    }

    return res.send({ count: response.length, data: response })
}

exports.fixtureInfo = async (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return res.status(403).send({ message: validationError.array() });
    }
    try {
        let fixture = await allModels.fixtureInfo.findOne({ fixtureId: req.query.fixtureId })
        console.log('fixture', fixture)
        if (fixture) {
            return res.send({ data: fixture })

        }
        else {
            let response = await axios.get(`https://cricket.sportmonks.com/api/v2.0/fixtures/${req.query.fixtureId}?include=localteam%2Cvisitorteam%2Cvenue%2Cstage%2Cfirstumpire%2Csecondumpire%2Ctosswon%2Creferee%2Cleague&api_token=3YUfERt5oESjf0ioV2at8peahGCvFrSSbJJH2Cjy6pJAJD5Cu7q59wrkI2rA`)
            // console.log(response.data)
            const storeFixtureInfo = new allModels.fixtureInfo({
                fixtureId: response.data.data.id,
                starting_at: response.data.data.starting_at,
                league: response.data.data.league,
                stage: response.data.data.stage,
                localteam: response.data.data.localteam,
                visitorteam: response.data.data.visitorteam,
                referee: response.data.data.referee,
                firstumpire: response.data.data.firstumpire,
                secondumpire: response.data.data.secondumpire,
                tosswon: response.data.data.tosswon,
                venue: response.data.data.venue,
            })
            const data = await storeFixtureInfo.save()
            // console.log("data", data)
            // const res =
            // {
            //     fixtureId: data.fixtureId,
            //     league: data.league,
            //     fixtureId: data.fixtureId


            // }
            // console.log("Res",res)
            return res.send({ data: data })

        }
    }
    catch (error) {
        return res.send({ message: error })
    }


}

