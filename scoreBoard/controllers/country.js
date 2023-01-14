let allModels = require("../../utilities/allModels");

exports.countryByContients = async (req, res) => {
    let countries = await allModels.country.find({ continentId: req.query.continentId })

    const response = []
    for (let index = 0; index < countries.length; index++) {
        const element = countries[index];
        let continent = await allModels.continents.findOne({ continentsId: element.continentId })
        console.log("continent", continent)

        const responseObject = {
            "resource": element.resource,
            "countryId": element.countryId,
            "countryName": element.countryName,
            "continentId": element.continentId,
            "continent": continent
        }


        response.push(responseObject)

    }




    console.log("nest", countries)

    return res.send({ count: response.length, data: response })


}

exports.getFixtures = async (req, res) => {
    let fixture = await allModels.fixtures.find({ startingAt: req.query.starting_at })
    const response = []
    for (let index = 0; index < fixture.length; index++) {
        const element = fixture[index];
        let leagues = await allModels.leagues.findOne({ LeagueId: element.league_id })
        // console.log("leagues", leagues)
        const country = await allModels.country.findOne({ countryId: leagues.country_id })
       // console.log("country", country)
        const fixtureResponse =
        {
            fixtureId: element.fixtureId,
            league_id: element.league_id,
            season_id: element.season_id,
            stage_id: element.stage_id,
            round: element.round,
            localteam_id: element.localteam_id,
            leagueName: leagues.leagueName,
            countryName: country.countryName,
            visitorteam_id: element.visitorteam_id
        }
        response.push(fixtureResponse)

    }


    return res.send({ response: response, count: fixture.length, data: fixture })
}