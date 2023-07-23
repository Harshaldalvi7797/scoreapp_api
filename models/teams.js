let mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


let teamSchema = new mongoose.Schema({

    _id: { type: ObjectId, default: null, index: true },
    teamId: { type: String, default: null, unique: true },
    name: { type: String, default: null },
    code: { type: String, default: null },
    image_path: { type: String, default: null },
    country_id: { type: String, default: null },
    national_team: { type: String, default: null },
});

let teamModel = mongoose.model("teams", teamSchema);
module.exports = teamModel;