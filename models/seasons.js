let mongoose = require("mongoose");

let seasonsSchema = new mongoose.Schema({

    resource: { type: String, default: null },
    seasonId: { type: String, default: null },
    seasonName: { type: String, default: null },
    league_id: { type: String, default: null },
    code: { type: String, default: null },
    updatedAt_sport_monk: { type: String, default: null }
}, { timestamps: true });

let seasonsModel = mongoose.model("seasons", seasonsSchema);
module.exports = seasonsModel;