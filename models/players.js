let mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

let playersSchema = new mongoose.Schema({
    // _id: { type: ObjectId, default: null, index: true },
    playerId: { type: String, default: null,unique: true },
    resource: { type: String, default: null },
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    fullname: { type: String, default: null },
    dateofbirth: { type: String, default: null },
    gender: { type: String, default: null },
    battingstyle: { type: String, default: null },
    bowlingstyle: { type: String, default: null },
    position: { type: Object, default: null },

}, { timestamps: true });

let playerModel = mongoose.model("players", playersSchema);
module.exports = playerModel;