const express = require('express');
const path = require('path')
const gameRoutes = require('./routes/game')

const app = express();
app.listen(3000, () => {
    console.log("server is listening at http://localhost:3000")
});

app.use(express.static(
    path.join(__dirname, "public")
))
gameRoutes(app)
