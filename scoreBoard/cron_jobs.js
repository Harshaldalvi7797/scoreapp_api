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
                    countryName: element.name,
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
        let response = await axios.get("https://cricket.sportmonks.com/api/v2.0/leagues/?api_token=3YUfERt5oESjf0ioV2at8peahGCvFrSSbJJH2Cjy6pJAJD5Cu7q59wrkI2rA")
        for (let index = 0; index < response.data.data.length; index++) {
            const element = response.data.data[index];
            const checkLeagueId = await allModels.leagues.findOne({ LeagueId: element.id })
            if (!checkLeagueId) {
                const storeLeague = new allModels.leagues({
                    resource: element.resource,
                    LeagueId: element.id,
                    leagueName: element.name,
                    season_id: element.season_id,
                    country_id: element.country_id,
                    code: element.code,
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

exports.storeSeasons = async () => {
    const job = nodeCron.schedule("*/10 * * * * *", async () => {
        const testing = [
            {
                "resource": "seasons",
                "id": 6,
                "league_id": 3,
                "name": "2018",
                "code": "2018",
                "updated_at": "2018-10-22T20:51:18.000000Z"
            },
            {
                "resource": "seasons",
                "id": 24,
                "league_id": 3,
                "name": "2018/2019",
                "code": "2018/2019",
                "updated_at": "2018-10-21T10:21:50.000000Z"
            },
            {
                "resource": "seasons",
                "id": 44,
                "league_id": 3,
                "name": "2019",
                "code": "2019",
                "updated_at": "2018-10-29T07:49:31.000000Z"
            },
            {
                "resource": "seasons",
                "id": 185,
                "league_id": 3,
                "name": "2017/2018",
                "code": "2017/2018",
                "updated_at": "2018-12-13T10:06:02.000000Z"
            },
            {
                "resource": "seasons",
                "id": 309,
                "league_id": 3,
                "name": "2019/2020",
                "code": "2019/2020",
                "updated_at": "2019-05-24T09:30:46.000000Z"
            },
            {
                "resource": "seasons",
                "id": 312,
                "league_id": 3,
                "name": "2020",
                "code": "2020",
                "updated_at": "2019-06-08T19:52:38.000000Z"
            },
            {
                "resource": "seasons",
                "id": 498,
                "league_id": 3,
                "name": "2020/2021",
                "code": "2020/2021",
                "updated_at": "2020-05-31T11:32:28.000000Z"
            },
            {
                "resource": "seasons",
                "id": 507,
                "league_id": 3,
                "name": "2021",
                "code": "2021",
                "updated_at": "2020-05-31T12:24:22.000000Z"
            },
            {
                "resource": "seasons",
                "id": 782,
                "league_id": 3,
                "name": "2022",
                "code": "2022",
                "updated_at": "2021-05-19T13:24:05.000000Z"
            },
            {
                "resource": "seasons",
                "id": 1058,
                "league_id": 3,
                "name": "2023",
                "code": "2023",
                "updated_at": "2022-07-03T12:14:58.000000Z"
            },
            {
                "resource": "seasons",
                "id": 10,
                "league_id": 5,
                "name": "2018/2019",
                "code": "2018/2019",
                "updated_at": "2018-11-10T21:32:35.000000Z"
            },
            {
                "resource": "seasons",
                "id": 104,
                "league_id": 5,
                "name": "2017/2018",
                "code": "2017/2018",
                "updated_at": "2018-11-06T08:33:23.000000Z"
            },
            {
                "resource": "seasons",
                "id": 107,
                "league_id": 5,
                "name": "2016/2017",
                "code": "2016/2017",
                "updated_at": "2018-11-06T08:33:54.000000Z"
            },
            {
                "resource": "seasons",
                "id": 110,
                "league_id": 5,
                "name": "2015/2016",
                "code": "2015/2016",
                "updated_at": "2018-11-06T08:34:13.000000Z"
            },
            {
                "resource": "seasons",
                "id": 324,
                "league_id": 5,
                "name": "2019/2020",
                "code": "2019/2020",
                "updated_at": "2019-07-10T19:55:59.000000Z"
            },
            {
                "resource": "seasons",
                "id": 450,
                "league_id": 5,
                "name": "2014/2015",
                "code": "2014/2015",
                "updated_at": "2020-04-30T15:35:00.000000Z"
            },
            {
                "resource": "seasons",
                "id": 453,
                "league_id": 5,
                "name": "2013/2014",
                "code": "2013/2014",
                "updated_at": "2020-05-01T13:18:51.000000Z"
            },
            {
                "resource": "seasons",
                "id": 525,
                "league_id": 5,
                "name": "2020/2021",
                "code": "2020/2021",
                "updated_at": "2020-07-15T09:34:23.000000Z"
            },
            {
                "resource": "seasons",
                "id": 830,
                "league_id": 5,
                "name": "2021/2022",
                "code": "2021/2022",
                "updated_at": "2021-07-14T19:49:33.000000Z"
            },
            {
                "resource": "seasons",
                "id": 1079,
                "league_id": 5,
                "name": "2022/2023",
                "code": "2022/2023",
                "updated_at": "2022-07-08T20:15:09.000000Z"
            },
            {
                "resource": "seasons",
                "id": 15,
                "league_id": 10,
                "name": "2018/2019",
                "code": "2018/2019",
                "updated_at": "2018-12-13T19:49:38.000000Z"
            },
            {
                "resource": "seasons",
                "id": 188,
                "league_id": 10,
                "name": "2017/2018",
                "code": "2017/2018",
                "updated_at": "2018-12-13T19:49:59.000000Z"
            },
            {
                "resource": "seasons",
                "id": 191,
                "league_id": 10,
                "name": "2016/2017",
                "code": "2016/2017",
                "updated_at": "2018-12-13T19:50:16.000000Z"
            },
            {
                "resource": "seasons",
                "id": 648,
                "league_id": 10,
                "name": "2021",
                "code": "2021",
                "updated_at": "2021-02-10T18:36:12.000000Z"
            },
            {
                "resource": "seasons",
                "id": 986,
                "league_id": 10,
                "name": "2021/2022",
                "code": "2021/2022",
                "updated_at": "2022-02-02T09:41:04.000000Z"
            },
            {
                "resource": "seasons",
                "id": 1145,
                "league_id": 10,
                "name": "2022/2023",
                "code": "2022/2023",
                "updated_at": "2022-09-18T15:09:59.000000Z"
            }
        ]
        for (let index = 0; index < testing.length; index++) {
            const element = testing[index];
            const checkSeasonId = await allModels.seasons.findOne({ seasonId: element.id })
            if (!checkSeasonId) {
                const storeSeasons = new allModels.seasons({
                    resource: element.resource,
                    seasonId: element.id,
                    seasonName: element.name,
                    league_id: element.league_id,
                    code: element.code,
                    updatedAt_sport_monk: element.updated_at
                })
                await storeSeasons.save()
            }
        }


    })
    job.start()
}

exports.storeFixtures = async () => {
    const job = nodeCron.schedule("*/10 * * * * *", async () => {
        console.log("hi")
        const testing = [
            {
                "resource": "fixtures",
                "id": 3,
                "league_id": 3,
                "season_id": 6,
                "stage_id": 1755,
                "round": "2nd T20I",
                "localteam_id": 40,
                "visitorteam_id": 41,
                "starting_at": "2018-10-12T16:00:00.000000Z",
                "type": "T20I",
                "live": false,
                "status": "Finished",
                "last_period": null,
                "note": "South Africa won by 6 wickets (with 26 balls remaining)",
                "venue_id": 96,
                "toss_won_team_id": 41,
                "winner_team_id": 40,
                "draw_noresult": null,
                "first_umpire_id": 36,
                "second_umpire_id": 127,
                "tv_umpire_id": 37,
                "referee_id": 15,
                "man_of_match_id": 80,
                "man_of_series_id": null,
                "total_overs_played": null,
                "elected": "batting",
                "super_over": false,
                "follow_on": false,
                "localteam_dl_data": {
                    "score": null,
                    "overs": null,
                    "wickets_out": null
                },
                "visitorteam_dl_data": {
                    "score": null,
                    "overs": null,
                    "wickets_out": null
                },
                "rpc_overs": null,
                "rpc_target": null,
                "weather_report": []
            }
        ]
        try {
            let response = await axios.get("https://cricket.sportmonks.com/api/v2.0/seasons/1223?include=fixtures&api_token=3YUfERt5oESjf0ioV2at8peahGCvFrSSbJJH2Cjy6pJAJD5Cu7q59wrkI2rA")
            //   console.log("response", response)
            for (let index = 0; index < response.data.data.fixtures.length; index++) {
                const element = response.data.data.fixtures[index];
                console.log("length ipl matches", response.data.data.fixtures.length)
                //  console.log("element", element)
                const checkFixtureId = await allModels.newFixtures.findOne({ fixtureId: element.id })
                // console.log("checkFixtureId", checkFixtureId)
                if (!checkFixtureId) {
                    console.log("here fix..")
                    const storeFixture = new allModels.newFixtures({
                        resource: element.resource,
                        fixtureId: element.id,
                        league_id: element.league_id,
                        season_id: element.season_id,
                        stage_id: element.stage_id,

                        round: element.round,
                        localteam_id: element.localteam_id,
                        visitorteam_id: element.visitorteam_id,
                        starting_at: element.starting_at,

                        type: element.type,
                        live: element.live,
                        status: element.status,
                        last_period: element.last_period,

                        note: element.node,
                        venue_id: element.venue_id,
                        toss_won_team_id: element.toss_won_team_id,
                        draw_noresult: element.draw_noresult,
                        winner_team_id: element.winner_team_id,

                        // first_umpire_id: element.first_umpire_id,
                        // second_umpire_id: element.second_umpire_id,
                        // tv_umpire_id: element.tv_umpire_id,
                        // referee_id: element.referee_id,
                        // man_of_series_id: element.man_of_series_id,
                        // man_of_match_id: element.man_of_match_id,
                        // total_overs_played: element.total_overs_played,
                        // elected: element.elected,
                        // super_over: element.super_over,
                        // follow_on: element.follow_on,
                        // localteam_dl_data: element.localteam_dl_data,
                        // visitorteam_dl_data: element.visitorteam_dl_data,
                        // rpc_overs: element.rpc_overs,
                        // rpc_target: element.rpc_target,
                        // weather_report: element.weather_report
                    })
                    await storeFixture.save()
                }
            }
        }
        catch (error) {
            console.log("error", error)

        }

    })
    job.start()
}

exports.storeTeam = async () => {
    const job = nodeCron.schedule("*/10 * * * * *", async () => {
        console.log("hi")
        try {
            let response = await axios.get("https://cricket.sportmonks.com/api/v2.0/teams?api_token=3YUfERt5oESjf0ioV2at8peahGCvFrSSbJJH2Cjy6pJAJD5Cu7q59wrkI2rA")
            // console.log("response", response)
            for (let index = 0; index < response.data.data.length; index++) {
                const element = response.data.data[index];
                console.log("teams", response.data.data.length)
                //  console.log("element", element)
                const checkFixtureId = await allModels.team.findOne({ teamId: element.id })
                // console.log("checkFixtureId", checkFixtureId)
                if (!checkFixtureId) {
                    console.log("here fix..")
                    const storeTeam = new allModels.team({
                        teamId: element.id,
                        name: element.name,
                        code: element.code,
                        image_path: element.image_path,
                        country_id: element.country_id,
                        national_team: element.national_team
                    })
                    await storeTeam.save()
                }
            }
        }
        catch (error) {
            console.log("error", error)

        }

    })
    job.start()
}

exports.BallByBall = async () => {

}

exports.scoreCardFixtures = async () => {
    const job = nodeCron.schedule("*/10 * * * * *", async () => {
        try {
            const fixtureId = "47033"
            let response = await axios.get(`https://cricket.sportmonks.com/api/v2.0/fixtures/${fixtureId}?include=runs&api_token=3YUfERt5oESjf0ioV2at8peahGCvFrSSbJJH2Cjy6pJAJD5Cu7q59wrkI2rA`)
            console.log("response", response.data.data.runs)
            const checkFixtureId = await allModels.scoreCard.findOne({ fixtureId: response.data.data.id })
            if(checkFixtureId)
            {
                console.log("update")
                //update
                checkFixtureId.runs=response.data.data.runs
                await checkFixtureId.save()


            }
        else{
            console.log("create")

            //create
            const storeFixtureScore = new allModels.scoreCard({
                resource:response.data.data.resource,
                fixtureId:response.data.data.id,
                runs:response.data.data.runs,
            })
            await storeFixtureScore.save()
        }




            //        for (let index = 0; index < response.data.data.fixtures.length; index++) {
            //    const element = response.data.runs[index];
            //    console.log("length ipl matches",element)
            // //   //  console.log("element", element)
            // //   const checkFixtureId = await allModels.newFixtures.findOne({ fixtureId: element.id })
            // // // console.log("checkFixtureId", checkFixtureId)
            // //  if (!checkFixtureId) {

            // //     }
            // }
        }
        catch (error) {
            console.log("error", error)

        }

    })
    job.start()
}


