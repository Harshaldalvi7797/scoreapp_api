const axios = require("axios");
let allModels = require("../../utilities/allModels");

exports.getPlayerById = async (req, res) => {
    console.log( req.query.playerId)
    let player = await allModels.players.find({ playerId: req.query.playerId })
    console.log(player)
    const playerDetails = []
    if (player.length){
        playerDetails.push(player)
    }else{
        let response = await axios.get(`https://cricket.sportmonks.com/api/v2.0/players/${req.query.playerId}?api_token=3YUfERt5oESjf0ioV2at8peahGCvFrSSbJJH2Cjy6pJAJD5Cu7q59wrkI2rA`)
        let data = response.data.data
        const storeVenue = await allModels.venues({
            playerId: data.id,
            resource: data.resource,
            firstname: data.firstname,
            lastname: data.lastname,
            fullname: data.fullname,
            dateofbirth: data.dateofbirth,
            gender: data.gender,
            battingstyle: data.battingstyle,
            bowlingstyle: data.bowlingstyle,
            position: data.position
        })
        let sv = await storeVenue.save()
        return res.send({ message: "Data added" })
    }
    return res.send({ count: playerDetails.length, data: playerDetails })
}


