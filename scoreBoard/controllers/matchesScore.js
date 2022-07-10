
const axios = require("axios")
const { json } = require("express")

exports.upcomingMatches = async (req, res) => {

    let response = await axios.get("https://api.cricapi.com/v1/currentMatches?apikey=9d4db62b-190c-4c1b-87d5-4998955b08c1&offset=0")


    let data = (response.data)

    return res.send({ data: data })


    // console.log("hiii")

}