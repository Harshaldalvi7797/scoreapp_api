const nodeCron = require("node-cron");

let allModels = require("../utilities/allModels");
const axios = require("axios");
exports.scoreSeries = async () => {
    const job = nodeCron.schedule("*/10 * * * * *", async () => {
        //   console.log("hiii");
        let response = await axios.get("https://api.cricapi.com/v1/series?apikey=9d4db62b-190c-4c1b-87d5-4998955b08c1&offset=0")
        let data = (response.data)
        // console.log("data", data.data.length)

        for (let index = 0; index < data.data.length; index++) {
            const element = data.data[index];


            let seriesData = await allModels.series.findOne({
                id: element.id
            })
            // console.log("seriesData", a)
            if (!seriesData) {
                let series = await allModels.series({
                    id: element.id,
                    name: element.name,
                    startDate: element.startDate,
                    endDate: element.endDate,
                    odi: element.odi,
                    t20: element.t20,
                    test: element.test,
                    squads: element.squads,
                    matches: element.matches,
                })
                let data1 = await series.save();
                // console.log(data1)
            }
        }
    });
    job.start()

}

exports.storeContinents = async () => {
    const job = nodeCron.schedule("*/10 * * * * *", async () => {
        const checkContinents = await allModels.continents.find()
        if (checkContinents.length <= 0) {
            console.log("data insert")
            let response = await axios.get("https://cricket.sportmonks.com/api/v2.0/continents?api_token=Xy6lMx77QhdrWTq1BJo5NC0HIjU9MCO4AB8jqtlKS86bJskr1Ha5KW4iRWcW")
            for (let index = 0; index < response.data.data.length; index++) {
                const element = response.data.data[index];
                let continent = await allModels.continents({
                    resource: element.resource,
                    continentsId: element.id,
                    continentName: element.name,
                    updatedAt_sport_monk: element.updated_at
                })
                let data1 = await continent.save();
            }
        }
    })
    job.start()
}

exports.storeCountry = async () => {
    const job = nodeCron.schedule("*/10 * * * * *", async () => {
        //    console.log("country cron")
        const checkCountry = await allModels.country.find()
        if (checkCountry.length <= 0) {
            console.log("country insert")
            let response = await axios.get("https://cricket.sportmonks.com/api/v2.0/countries/?api_token=Xy6lMx77QhdrWTq1BJo5NC0HIjU9MCO4AB8jqtlKS86bJskr1Ha5KW4iRWcW")
            for (let index = 0; index < response.data.data.length; index++) {
                const element = response.data.data[index];
                let country = await allModels.country({
                    resource: element.resource,
                    countryId: element.id,
                    continentId: element.continent_id,
                    updatedAt_sport_monk: element.updated_at,
                    image_path: element.image_path
                })
                let data1 = await country.save();
                console.log("Data country store", data1)
            }

        }

    })
    job.start()

}

exports.storeLeagues = async () => {
    const job = nodeCron.schedule("*/10 * * * * *", async () => {
        // const testing = [
        //     {
        //         "resource": "leagues",
        //         "id": 15,
        //         "season_id": 782,
        //         "country_id": 99474,
        //         "name": "Twenty20 International",
        //         "code": "T20I",
        //         "image_path": "https://cdn.sportmonks.com/images/cricket/leagues/3/3.png",
        //         "type": "phase",
        //         "updated_at": "2022-01-13T15:11:06.000000Z"
        //     },
        //     {
        //         "resource": "leagues",
        //         "id": 16,
        //         "season_id": 1079,
        //         "country_id": 98,
        //         "name": "Big Bash League",
        //         "code": "BBL",
        //         "image_path": "https://cdn.sportmonks.com/images/cricket/leagues/5/5.png",
        //         "type": "league",
        //         "updated_at": "2022-07-08T20:15:09.000000Z"
        //     },
        //     {
        //         "resource": "leagues",
        //         "id": 17,
        //         "season_id": 1145,
        //         "country_id": 146,
        //         "name": "CSA T20 Challenge",
        //         "code": "T20C",
        //         "image_path": "https://cdn.sportmonks.com/images/cricket/leagues/10/10.png",
        //         "type": "league",
        //         "updated_at": "2022-09-18T15:09:59.000000Z"
        //     }
        // ]
        let response = await axios.get("https://cricket.sportmonks.com/api/v2.0/leagues/?api_token=Xy6lMx77QhdrWTq1BJo5NC0HIjU9MCO4AB8jqtlKS86bJskr1Ha5KW4iRWcW")
        console.log("league response", response.data.data)
        for (let index = 0; index < response.data.data.length; index++) {
            const element = response.data.data[index];
            const checkLeagueId = await allModels.leagues.findOne({ LeagueId: element.id })
            if (!checkLeagueId) {
                const storeLeague = new allModels.leagues({
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
                await storeLeague.save()

            }
        }
    })
    job.start()
}