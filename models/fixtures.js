let mongoose = require("mongoose");

let fixturesSchema = new mongoose.Schema({

    resource: { type: String, default: null },
    fixtureId: { type: String, default: null },
    league_id: { type: String, default: null },
    season_id: { type: String, default: null },
    stage_id: { type: String, default: null },
    round: { type: String, default: null },
    localteam_id: { type: String, default: null },
    visitorteam_id: { type: String, default: null },
    starting_at: { type: String, default: null },
    type: { type: String, default: null },
    live: { type: Boolean, default: false },
    status: { type: String, default: null },
    last_period: { type: String, default: null },
    note: { type: String, default: null },
    venue_id: { type: String, default: null },
    winner_team_id: { type: String, default: null },
    toss_won_team_id: { type: String, default: null },
    draw_noresult: { type: String, default: null },
    first_umpire_id: { type: String, default: null },
    second_umpire_id: { type: String, default: null },
    tv_umpire_id: { type: String, default: null },
    referee_id: { type: String, default: null },
    man_of_match_id: { type: String, default: null },
    man_of_series_id: { type: String, default: null },
    total_overs_played: { type: String, default: null },
    elected: { type: String, default: null },
    super_over: { type: Boolean, default: null },
    follow_on: { type: Boolean, default: null },

    localteam_dl_data: { type: String, default: null },
    visitorteam_dl_data: { type: String, default: null },

    rpc_overs: { type: Object, default: null },
    rpc_target: { type: Object, default: null },

    weather_report: { type: Array, default: null },

}, { timestamps: true });

let fixturesModel = mongoose.model("fixtures", fixturesSchema);
module.exports = fixturesModel;