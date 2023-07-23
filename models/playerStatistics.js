let mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

let playerStatisticSchema = new mongoose.Schema({
    playerId: { type: String, default: null,unique: true },
    country_id: { type: String, default: null },
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    fullname: { type: String, default: null },
    image_path: { type: String, default: null },
    dateofbirth: { type: String, default: null },
    gender: { type: String, default: null },
    battingstyle: { type: String, default: null },
    bowlingstyle: { type: String, default: null },
    position: { type: Object, default: null },
    career: { type: Object, default: null },

}, { timestamps: true });

let playerStatisticModel = mongoose.model("playersstatistic", playerStatisticSchema);
module.exports = playerStatisticModel;