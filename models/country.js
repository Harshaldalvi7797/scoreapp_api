let mongoose = require("mongoose");

let countrySchema = new mongoose.Schema({

    resource: { type: String, default: null },
    countryId: { type: String, default: null },
    countryName: { type: String, default: null },
    continentId: { type: String, default: null },
    updatedAt_sport_monk: { type: String, default: null },
    image_path: { type: String, default: null },
}, { timestamps: true });

let countryModel = mongoose.model("country", countrySchema);
module.exports = countryModel;