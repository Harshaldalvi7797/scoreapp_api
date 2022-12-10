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