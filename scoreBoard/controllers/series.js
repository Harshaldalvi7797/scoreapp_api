let allModels = require("../../utilities/allModels");


exports.GetSeries = async (req, res) => {

    let series = await allModels.country.deleteMany();

    return res.send({ data: series })

}