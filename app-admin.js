
const ALL_ROUTES = require('./utilities/allScoreBoardRoute');

exports.routes = (app) => {
    app.use(ALL_ROUTES.matchesScore)

}