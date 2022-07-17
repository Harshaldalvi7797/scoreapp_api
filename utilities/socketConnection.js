let allModels = require("./allModels");

const series = require('./../scoreBoard/controllers/series');
exports.socketConnect = async (server) => {
    console.log("socket call");
    var io = require('socket.io')(server);
    // relations();
    io.on('connection', (socket) => {
        console.log('socket connected');

        //This event for joining chat room
        socket.on('joinRoom', (data) => {
            console.log(data);
        })

        socket.on('get-series', (data) => {
            series.GetSeries(data).then(result => {
                console.log(result)
                io.to().emit('get-series', result);
            })
        });

    })
}

