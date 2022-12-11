let allModels = require("../../utilities/allModels");

exports.countryByContients = async (req, res) => {
    let countries = await allModels.country.find({ continentId: req.query.continentId });

    return res.send({ count: countries.length, data: countries })


}