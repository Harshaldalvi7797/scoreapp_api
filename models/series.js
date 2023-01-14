let mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


let seriesSchema = new mongoose.Schema({

    _id: { type: ObjectId, default: null, index: true },
    name: { type: String, default: null },
    customerId: { type: ObjectId, default: null, index: true }
    // startDate: { type: String, default: null },
    // endDate: { type: String, default: null },
    // odi: { type: Number, default: null },
    // t20: { type: Number, default: null },
    // test: { type: Number, default: null },
    // squads: { type: Number, default: null },
    // matches: { type: Number, default: null },

});

let seriesModel = mongoose.model("series", seriesSchema);
module.exports = seriesModel;