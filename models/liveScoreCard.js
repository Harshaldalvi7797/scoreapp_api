let mongoose = require("mongoose");
let liveScoreSchema = new mongoose.Schema({

    resource: { type: String, default: null },
    fixtureId: { type: String, default: null },
    league_id: { type: String, default: null },
    season_id: { type: String, default: null },
    runs:[],
    startingAt:Number,
    createdDate: Number,
    updatedDate: Number,
    note: { type: String, default: null },

}, { timestamps: true });

liveScoreSchema.pre('save', function (next) {
    if (this.createdAt) {
        this.createdDate = setDateTime(this.createdAt)
    }
    if (this.updatedAt) {
        this.updatedDate = setDateTime(this.updatedAt)
    }
    if (this.starting_at) {
        this.startingAt = setDateTime(this.starting_at)
    }
    next()
});

const setDateTime = (stringdate) => {
    let date = new Date(stringdate.toString());
    // console.log(date);
    let year = date.getFullYear();
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    // let hr = ("0" + date.getHours()).slice(-2);
    // let min = ("0" + date.getMinutes()).slice(-2);
    // let sec = ("0" + date.getSeconds()).slice(-2);

    // console.log(`${year}-${mnth}-${day} ${hr}:${min}:${sec}`)
    //return Number(`${year}${mnth}${day}${hr}${min}${sec}`)
    return Number(`${year}${mnth}${day}`)
}

let liveScoreModel = mongoose.model("livescorecard", liveScoreSchema);
module.exports = liveScoreModel;