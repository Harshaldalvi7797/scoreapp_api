const axios = require("axios")
const { json } = require("express")

let allModels = require("../../utilities/allModels");


exports.GetSeries = async (req, res) => {

    let series = await allModels.continents.find();

    return res.send({ data: series })

}