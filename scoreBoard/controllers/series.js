const axios = require("axios")

let allModels = require("../../utilities/allModels");


exports.GetSeries = async (req, res) => {

    let series = await allModels.seasons.deleteMany();

    return res.send({ data: series })

}