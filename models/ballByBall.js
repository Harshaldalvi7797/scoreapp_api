let mongoose = require("mongoose");

let ballByBallSchema = new mongoose.Schema({

    resource: { type: String, default: null },
    fixtureId: { type: String, default: null },
    league_id: { type: String, default: null },
    season_id: { type: String, default: null },
    stage_id:{ type: String, default: null },
    round:{ type: String, default: null },
    localteam_id:{ type: String, default: null },
    visitorteam_id:{ type: String, default: null },
    starting_at:{ type: String, default: null },
    type:{ type: String, default: null },
    live:{ type: String, default: null },
    status:{ type: String, default: null },
    last_period:{ type: String, default: null },
    note:{ type: String, default: null },
    total_overs_played:{ type: String, default: null },
    elected:{ type: String, default: null },
    balls:[],
    startingAt:Number,
    createdDate: Number,
    updatedDate: Number

}, { timestamps: true });

ballByBallSchema.pre('save', function (next) {
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

let ballModel = mongoose.model("ballbyball", ballByBallSchema);
module.exports = ballModel;