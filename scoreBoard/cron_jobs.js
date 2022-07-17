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