let express = require("express")
let app = express()




//Admin Route Define
let apiAdminRoute = require("./app-admin")
apiAdminRoute.routes(app)

const PORT = 4000
//port connection
app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`)
});