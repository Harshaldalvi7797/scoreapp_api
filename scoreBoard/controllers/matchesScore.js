
const axios = require("axios")
const { json } = require("express")

exports.upcomingMatches = async (req, res) => {

    setInterval(myTimer, 1000);

    async function myTimer() {
        // const date = new Date();
        // console.log(date.toLocaleTimeString())
        let response = await axios.get("https://api.cricapi.com/v1/series?apikey=9d4db62b-190c-4c1b-87d5-4998955b08c1&offset=0")
        let data = (response.data)
        console.log("data", data)

        return res.send({ data: data })
    }

    // setTimeout(() => {
    //     console.log("hii")
    // }, 1000)
    // setTimeout(async () => {
    //     let response = await axios.get("https://api.cricapi.com/v1/currentMatches?apikey=9d4db62b-190c-4c1b-87d5-4998955b08c1&offset=0")
    //     let data = (response.data)
    //     console.log("data", data)

    //     return res.send({ data: data })
    // }, 2000)




    // console.log("hiii")

}