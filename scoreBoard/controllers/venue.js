let allModels = require("../../utilities/allModels");

// exports.countryByContients = async (req, res) => {
//     let countries = await allModels.country.find({ continentId: req.query.continentId })

//     const response = []
//     for (let index = 0; index < countries.length; index++) {
//         const element = countries[index];
//         let continent = await allModels.continents.findOne({ continentsId: element.continentId })
//         console.log("continent", continent)

//         const responseObject = {
//             "resource": element.resource,
//             "countryId": element.countryId,
//             "countryName": element.countryName,
//             "continentId": element.continentId,
//             "continent": continent
//         }


//         response.push(responseObject)

//     }




//     console.log("nest", countries)

//     return res.send({ count: response.length, data: response })


// }

// exports.getFixtures = async (req, res) => {
//     console.log(typeof req.query.starting_at)
//    let fixture = await allModels.newFixtures.find({ startingAt: req.query.starting_at })
//     const response = []
//     for (let index = 0; index < fixture.length; index++) {
//         const element = fixture[index];
//         let leagues = await allModels.leagues.findOne({ LeagueId: element.league_id })
//         // // console.log("leagues", leagues)
//         // const country = await allModels.country.findOne({ countryId: leagues.country_id })
//        // console.log("country", country)
//     let teamV = await allModels.team.findOne({ teamId: element.visitorteam_id})
//     let teamL = await allModels.team.findOne({ teamId: element.localteam_id})
//         const fixtureResponse =
//         {
//             fixtureId: element.fixtureId,
//             // league_id: element.league_id,
//             // season_id: element.season_id,
//             // stage_id: element.stage_id,
//             round: element.round,
//             // localteam_id: element.localteam_id,
//             localteamName: teamL.name,
//              leagueName: leagues.leagueName,
//             // countryName: country.countryName,
//             //visitorteam_id: element.visitorteam_id,
//             visitorteamName: teamV.name,
//             starting_at:new Date(element.starting_at).toLocaleString()
//         }
//         response.push(fixtureResponse)

//     }
//   // let leagues = await allModels.team.findOne({ teamId: element. })
//     // let fixture = await allModels.newFixtures.aggregate([
//     //     { $match: { "startingAt": parseFloat(req.query.starting_at)  } },
//     //     {
//     //         $lookup: {
//     //             from: "team",
//     //             localField: "localteam_id",
//     //             foreignField: "id",
//     //             as: "localteam"
//     //         }
//     //     },

//     // ])
//     return res.send({ count: response.length, data: response })
// }

exports.addVenue = async (req, res) => {
    const data = [
        {
            "resource": "venues",
            "id": 1,
            "country_id": 98,
            "name": "Adelaide Oval",
            "city": "Adelaide",
            "image_path": "https://cdn.sportmonks.com/images/cricket/venues/1/1.png",
            "capacity": 53583,
            "floodlight": true,
            "updated_at": "2018-11-14T07:43:05.000000Z"
        },
        {
            "resource": "venues",
            "id": 2,
            "country_id": 98,
            "name": "W.A.C.A. Ground",
            "city": "East Perth,  Perth, Western Australia",
            "image_path": "https://cdn.sportmonks.com/images/cricket/venues/2/2.png",
            "capacity": 18000,
            "floodlight": true,
            "updated_at": "2018-11-14T17:47:15.000000Z"
        },
        {
            "resource": "venues",
            "id": 3,
            "country_id": 98,
            "name": "Tony Ireland Stadium, Townsville",
            "city": "Thuringowa,  Townsville, Queensland",
            "image_path": "https://cdn.sportmonks.com/images/cricket/venues/3/3.png",
            "capacity": 10000,
            "floodlight": false,
            "updated_at": "2018-11-14T17:43:45.000000Z"
        },
    ]

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        const storeVenue = await allModels.venues({
            venueId: element.id,
            name: element.name,
            city: element.city,
            image_path: element.image_path,
            country_id: element.country_id,
            floodlight: element.floodlight,
            capacity: element.capacity
        })
        let sv = await storeVenue.save()
    }
    //let st = await storeTeam.save()
    return res.send({ message: "data store" })

}
// exports.fixturesScore= async (req,res)=>

// {
//     console.log("welcome")
//       let fixture = await allModels.scoreCard.find({ "fixtureId": req.query.fixtureId })

//     return res.send(fixture)
// }

// exports.fetchFixtureLiveScore= async (req,res)=>
// {
//     console.log("req.body.fixtureId ",req.query.id )
//     let fixture = await allModels.scoreCard.find({ "fixtureId": "47033" })

//     return res.send(fixture)

// }