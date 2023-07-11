let allModels = require("../../utilities/allModels");

exports.getVenueById = async (req, res) => {
    console.log(typeof req.query.venueId)
    let venue = await allModels.venues.find({ venueId: req.query.venueId })
    const response = []
    if (venue){
        response.push(venue)
    }
    return res.send({ count: response.length, data: response })
}

exports.addVenue = async (req, res) => {
    const data = [
        {
            "resource": "venues",
            "id": 1,
            "country_id": 98,
            "name": "Adelaide Oval",
            "city": "Adelaide",
            "image_path": "https://cdn.sportmonks.com/images/cricket/venues/1/1.png",
            "capacity": 53583,
            "floodlight": true,
            "updated_at": "2018-11-14T07:43:05.000000Z"
        },
        {
            "resource": "venues",
            "id": 2,
            "country_id": 98,
            "name": "W.A.C.A. Ground",
            "city": "East Perth,  Perth, Western Australia",
            "image_path": "https://cdn.sportmonks.com/images/cricket/venues/2/2.png",
            "capacity": 18000,
            "floodlight": true,
            "updated_at": "2018-11-14T17:47:15.000000Z"
        },
        {
            "resource": "venues",
            "id": 3,
            "country_id": 98,
            "name": "Tony Ireland Stadium, Townsville",
            "city": "Thuringowa,  Townsville, Queensland",
            "image_path": "https://cdn.sportmonks.com/images/cricket/venues/3/3.png",
            "capacity": 10000,
            "floodlight": false,
            "updated_at": "2018-11-14T17:43:45.000000Z"
        },
    ]

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        const storeVenue = await allModels.venues({
            venueId: element.id,
            name: element.name,
            city: element.city,
            image_path: element.image_path,
            country_id: element.country_id,
            floodlight: element.floodlight,
            capacity: element.capacity
        })
        let sv = await storeVenue.save()
    }
    //let st = await storeTeam.save()
    return res.send({ message: "data store" })

}
