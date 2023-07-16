const axios = require("axios");
let allModels = require("../../utilities/allModels");

exports.getVenueById = async (req, res) => {
    let venue = await allModels.venues.find({ venueId: req.query.venueId })
    const venueDetails = []
    if (venue.length){
        venueDetails.push(venue)
    }else{
        let response = await axios.get(`https://cricket.sportmonks.com/api/v2.0/venues/${req.query.venueId}?api_token=3YUfERt5oESjf0ioV2at8peahGCvFrSSbJJH2Cjy6pJAJD5Cu7q59wrkI2rA`)
        let data = response.data.data
        const storeVenue = await allModels.venues({
            venueId: data.id,
            name: data.name,
            city: data.city,
            image_path: data.image_path,
            country_id: data.country_id,
            floodlight: data.floodlight,
            capacity: data.capacity
        })
        let sv = await storeVenue.save()
        return res.send({ message: "Data added" })
    }
    return res.send({ count: venueDetails.length, data: venueDetails })
}


