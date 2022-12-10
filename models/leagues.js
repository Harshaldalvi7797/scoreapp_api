let mongoose = require("mongoose");

let leaguesSchema = new mongoose.Schema({

    resource: { type: String, default: null },
    LeagueId: { type: String, default: null },
    leagueName: { type: String, default: null },
    season_id: { type: String, default: null },
    country_id: { type: String, default: null },
    code: { type: String, default: null },
    image_path: { type: String, default: null },
    updatedAt_sport_monk: { type: String, default: null },
    type: { type: String, default: null },
}, { timestamps: true });

let leaguesModel = mongoose.model("leagues", leaguesSchema);
module.exports = leaguesModel;