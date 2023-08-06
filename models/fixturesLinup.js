let mongoose = require("mongoose");

let fixtureLineUpSchema = new mongoose.Schema({

    fixtureId: { type: String, default: null },
    lineup: { type: Array, default: null },
    localteam_id: { type: String, default: null },
    localteam: { type: String, default: null },
    visitorteam: { type: String, default: null },
    visitorteam_id: { type: String, default: null },
    startingAt: Number,

}, { timestamps: true });

// fixtureLineUpSchema.pre('save', function (next) {
//     if (this.createdAt) {
//         this.createdDate = setDateTime(this.createdAt)
//     }
//     if (this.updatedAt) {
//         this.updatedDate = setDateTime(this.updatedAt)
//     }
//     if (this.starting_at) {
//         this.startingAt = setDateTime(this.starting_at)
//     }
//     next()
// });

// const setDateTime = (stringdate) => {
//     let date = new Date(stringdate.toString());
//     // console.log(date);
//     let year = date.getFullYear();
//     let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
//     let day = ("0" + date.getDate()).slice(-2);
//     // let hr = ("0" + date.getHours()).slice(-2);
//     // let min = ("0" + date.getMinutes()).slice(-2);
//     // let sec = ("0" + date.getSeconds()).slice(-2);

//     // console.log(`${year}-${mnth}-${day} ${hr}:${min}:${sec}`)
//     //return Number(`${year}${mnth}${day}${hr}${min}${sec}`)
//     return Number(`${year}${mnth}${day}`)
// }
let fixtureLineUpModel = mongoose.model("fixturelineup", fixtureLineUpSchema);
module.exports = fixtureLineUpModel;