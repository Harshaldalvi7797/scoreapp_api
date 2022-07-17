let mongoose = require("mongoose");


let seriesSchema = new mongoose.Schema({

    id: { type: String, default: null },
    name: { type: String, default: null },
    startDate: { type: String, default: null },
    endDate: { type: String, default: null },
    odi: { type: Number, default: null },
    t20: { type: Number, default: null },
    test: { type: Number, default: null },
    squads: { type: Number, default: null },
    matches: { type: Number, default: null },

});

let seriesModel = mongoose.model("series", seriesSchema);
module.exports = seriesModel;