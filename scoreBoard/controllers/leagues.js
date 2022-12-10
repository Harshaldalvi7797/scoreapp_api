let allModels = require("../../utilities/allModels");


exports.addLeagues = async (req, res) => {

    console.log("Welcome")

    const testing = [
        {
            "resource": "leagues",
            "id": 3,
            "season_id": 782,
            "country_id": 99474,
            "name": "Twenty20 International",
            "code": "T20I",
            "image_path": "https://cdn.sportmonks.com/images/cricket/leagues/3/3.png",
            "type": "phase",
            "updated_at": "2022-01-13T15:11:06.000000Z"
        },
        {
            "resource": "leagues",
            "id": 5,
            "season_id": 1079,
            "country_id": 98,
            "name": "Big Bash League",
            "code": "BBL",
            "image_path": "https://cdn.sportmonks.com/images/cricket/leagues/5/5.png",
            "type": "league",
            "updated_at": "2022-07-08T20:15:09.000000Z"
        },
        {
            "resource": "leagues",
            "id": 10,
            "season_id": 1145,
            "country_id": 146,
            "name": "CSA T20 Challenge",
            "code": "T20C",
            "image_path": "https://cdn.sportmonks.com/images/cricket/leagues/10/10.png",
            "type": "league",
            "updated_at": "2022-09-18T15:09:59.000000Z"
        }
    ]
    const data = {
        "resource": "leagues",
        "id": 3,
        "season_id": 782,
        "country_id": 99474,
        "name": "Twenty20 International",
        "code": "T20I",
        "image_path": "https://cdn.sportmonks.com/images/cricket/leagues/3/3.png",
        "type": "phase",
        "updated_at": "2022-01-13T15:11:06.000000Z"
    }
    for (let index = 0; index < testing.length; index++) {
        const element = testing[index];
        console.log("element", element)
        // const checkLeagueId = await allModels.leagues.findOne({ LeagueId: element.id })
        // if (!checkLeagueId) {
        const storeLeague = await allModels.leagues({
            resource: element.resource,
            LeagueId: element.id,
            leagueName: element.name,
            season_id: element.resource,
            country_id: element.console,
            code: element.resource,
            image_path: element.image_path,
            type: element.type,
            updatedAt_sport_monk: element.updated_at
        })
        let st = await storeLeague.save()
        return res.send({ message: "data store", data: st })

        //}

    }

    return res.send({ message: "data store already" })



}
