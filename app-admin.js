
const ALL_ROUTES = require('./utilities/allScoreBoardRoute');

exports.routes = (app) => {
    app.use(ALL_ROUTES.matchesScore),
     app.use(ALL_ROUTES.series),
     app.use(ALL_ROUTES.leagues),
     app.use(ALL_ROUTES.country),
     app.use(ALL_ROUTES.fixtures),
     app.use(ALL_ROUTES.venues)
}