const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const nocache = require("nocache")
const compression = require("compression")
const DB = require("./api/models/index")
const Route = require("./api/routes/index")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(nocache())
app.use(compression())
DB.sequelize.sync()


app.use("/api/v1", Route)
app.get("/", async (req, res) => {
    res.send("Wow!ð¯ are you here with MSSQLðð but you have no access!!! ððð")
})

app.use((req, res, next) => {
    let error = new Error('404 page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        return res.status(404).json({
            message: error.message
        })
    }
    if (error.status == 400) {
        return res.status(400).json({
            message: "Bad request"
        })
    }
    if (error.status == 401) {
        return res.status(401).json({
            message: "You have no permission"
        })
    }
    return res.status(500).json({
        message: "Internal Server Error"
    })
})

// App Port
const port = process.env.APP_PORT || 4000
app.listen(port, () => {
    console.log(`App running on ${port} port`)
})