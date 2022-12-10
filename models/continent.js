let mongoose = require("mongoose");

let continentsSchema = new mongoose.Schema({

    resource: { type: String, default: null },
    continentName: { type: String, default: null },
    updatedAt_sport_monk: { type: String, default: null },
    continentsId: { type: String, default: null },
}, { timestamps: true });

let continentModel = mongoose.model("continents", continentsSchema);
module.exports = continentModel;