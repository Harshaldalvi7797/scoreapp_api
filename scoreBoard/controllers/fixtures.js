let allModels = require("../../utilities/allModels");

exports.getFixturesFromDate = async (req, res) => {
    let fixture = await allModels.newFixtures.find({ startingAt: req.query.starting_at })
    const response = []
    for (let index = 0; index < fixture.length; index++) {
        const element = fixture[index];
        let leagues = await allModels.leagues.findOne({ LeagueId: element.league_id })
        let teamV = await allModels.team.findOne({ teamId: element.visitorteam_id })
        let teamL = await allModels.team.findOne({ teamId: element.localteam_id })
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
            startingTime: element.starting_at
        }
        response.push(fixtureResponse)
    }

    return res.send({ count: response.length, data: response })
}