let mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

let venuesSchema = new mongoose.Schema({
    venueId: { type: String, default: null,unique: true },
    country_id: { type: String, default: null },
    name: { type: String, default: null },
    city: { type: String, default: null },
    image_path: { type: String, default: null },
    capacity: { type: String, default: null },
    floodlight: { type: String, default: null },                                          
}, { timestamps: true });

let venueModel = mongoose.model("venues", venuesSchema);
module.exports = venueModel;