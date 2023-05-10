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
    console.log(typeof req.query.starting_at)
   let fixture = await allModels.newFixtures.find({ startingAt: req.query.starting_at })
    const response = []
    for (let index = 0; index < fixture.length; index++) {
        const element = fixture[index];
        let leagues = await allModels.leagues.findOne({ LeagueId: element.league_id })
        // // console.log("leagues", leagues)
        // const country = await allModels.country.findOne({ countryId: leagues.country_id })
       // console.log("country", country)
    let teamV = await allModels.team.findOne({ teamId: element.visitorteam_id})
    let teamL = await allModels.team.findOne({ teamId: element.localteam_id})
        const fixtureResponse =
        {
            fixtureId: element.fixtureId,
            // league_id: element.league_id,
            // season_id: element.season_id,
            // stage_id: element.stage_id,
            round: element.round,
            // localteam_id: element.localteam_id,
            localteamName: teamL.name,
             leagueName: leagues.leagueName,
            // countryName: country.countryName,
            //visitorteam_id: element.visitorteam_id,
            visitorteamName: teamV.name,
            starting_at:new Date(element.starting_at).toLocaleString()
        }
        response.push(fixtureResponse)

    }
  // let leagues = await allModels.team.findOne({ teamId: element. })
    // let fixture = await allModels.newFixtures.aggregate([
    //     { $match: { "startingAt": parseFloat(req.query.starting_at)  } },
    //     {
    //         $lookup: {
    //             from: "team",
    //             localField: "localteam_id",
    //             foreignField: "id",
    //             as: "localteam"
    //         }
    //     },

    // ])
    return res.send({ count: response.length, data: response })
}

exports.addTeam = async (req, res) => {
    const data = [
        {
            "resource": "teams",
            "id": 1,
            "name": "Pakistan",
            "code": "PAK",
            "image_path": "https://cdn.sportmonks.com/images/cricket/teams/1/1.png",
            "country_id": 190324,
            "national_team": true,
            "updated_at": "2018-11-29T11:47:20.000000Z"
        },
        {
            "resource": "teams",
            "id": 2,
            "name": "Chennai Super Kings",
            "code": "CSK",
            "image_path": "https://cdn.sportmonks.com/images/cricket/teams/2/2.png",
            "country_id": 153732,
            "national_team": false,
            "updated_at": "2022-03-03T15:05:47.000000Z"
        },
        {
            "resource": "teams",
            "id": 3,
            "name": "Delhi Capitals",
            "code": "DC",
            "image_path": "https://cdn.sportmonks.com/images/cricket/teams/3/3.png",
            "country_id": 153732,
            "national_team": false,
            "updated_at": "2020-07-03T07:55:50.000000Z"
        },
    ]

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        const storeTeam = await allModels.team({
            teamId: element.id,
            name: element.name,
            code: element.code,
            image_path: element.image_path,
            country_id: element.country_id,
            national_team: element.national_team
        })
        let st = await storeTeam.save()
    }
    //let st = await storeTeam.save()
    return res.send({ message: "data store" })

}
exports.fixturesScore= async (req,res)=>

{
    console.log("welcome")
      let fixture = await allModels.scoreCard.find({ "fixtureId": req.query.fixtureId })

    return res.send(fixture)
}

// exports.fetchFixtureLiveScore= async (req,res)=>
// {
//     console.log("req.body.fixtureId ",req.query.id )
//     let fixture = await allModels.scoreCard.find({ "fixtureId": "47033" })

//     return res.send(fixture)

// }