let express = require("express")
let app = express()
const axios = require("axios");
let mongoose = require("mongoose")

require("dotenv").config();
//Admin Route Define
let apiAdminRoute = require("./app-admin")
apiAdminRoute.routes(app)

const CronJobs = require('./scoreBoard/cron_jobs')
CronJobs.scoreSeries();
CronJobs.storeContinents();
CronJobs.storeCountry();
// CronJobs.storeLeagues();
// CronJobs.storeSeasons();
// CronJobs.storeFixtures();
//CronJobs.storeTeam();
// CronJobs.scoreCardFixtures();
//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});




mongoose.connect("mongodb+srv://Tilltoss:23bc07de@cluster0.npoblfd.mongodb.net/cricket", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`connected  to DB successfully`))
  .catch((error) => console.log(`something went wrong ${error.message}`));
const PORT = process.env.PORT
//port connection
let server = app.listen(8080, () => {
  console.log(`connected to port ${8080}`)
});

const socket = require('./utilities/socketConnection');
socket.socketConnect(server);