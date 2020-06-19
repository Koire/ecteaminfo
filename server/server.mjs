import express from "express"
import dotenv from "dotenv"
import fetch from "node-fetch"
import crypto from "crypto"
import cors from "cors"
import * as endpoints from "./apiEndpoints.mjs";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import {Player} from "./db/models/players.js";
import {connectToDb} from "./db/connect.js";

dotenv.config({path: "../.env"})


const app = express()
app.use(express.static("../webclient/dist"))
app.use(cookieParser(process.env.secret))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
    extended: true
}))

const port = 3000

const genHeaders = apiKey => {
    const now = Math.floor(Date.now()/1000)
    const {clientSecret} = process.env
    const signature = `${clientSecret}:${apiKey}:${now}`
    return {
        'X-WarDragons-APIKey': apiKey,
        'X-WarDragons-Request-Timestamp': now,
        "X-WarDragons-Signature": crypto.createHash("sha256").update(signature).digest("hex")
    }
}


if (process.env.NODE_ENV === "development") {
    app.use(cors())
}

app.get("/signin", (req, res) => {
    const WDAPI = new URL("https://api-dot-pgdragonsong.appspot.com/api/authorize")
    WDAPI.searchParams.append("client_id", process.env.clientId)
    WDAPI.searchParams.append("scopes", "atlas.read,player.public.read")
    // res.send(`URL: ${WDAPI}`)
    //https://api-dot-pgdragonsong.appspot.com/api/authorize?client_id=app-X-dX6RrcT7andAWa83Ypdg&scopes=atlas.read,player.public.read
    res.redirect(WDAPI)
})
app.get("/myprofile", async(req, res) => {
    fetch(endpoints.getMyProfile("apikey-WDpEEsyHQP-a9a4SVYfCRQ"), {
        headers: genHeaders("apikey-WDpEEsyHQP-a9a4SVYfCRQ")
    })
        .then(res => res.json())
        .then(jsonData => res.send(jsonData))
    //res.send((await profileResponse.json()))
})
app.get("/login", async(req, res) => {

})
app.post("/login", async(req, res) => {
    const {username, password } = req.body
    const pw = bcrypt.hashSync(password, 10)
    bcrypt.hash(password, 8, (err, hash) => {
        console.log("pw:", hash)
        bcrypt.hash(hash, 8, (err, hash2) => {
            bcrypt.compare(hash, hash2, (err, res2) => {
                console.log("compared:", res2)
                res.send("Hello")
            })
        })
    })

})
app.get("/teaminfo", async(req, res) => {
    const response = await fetch(endpoints.teamContribution(), {
        headers: genHeaders("apikey-tqYfz7RgRTqk3zGu-SrNyA")
    })
    const resData = await response
    const resJson = await resData.json()
    const prettyRes = resJson.entries.map(({stats: {monthly_gold, monthly_mats, monthly_ships}, for_name}) => ({
        name: for_name,
        gold:monthly_gold,
        mats: monthly_mats,
        kills: monthly_ships
    }))
    res.send(prettyRes)
})
app.get("/castleinfo", async (req, res) => {

})
app.get("/troopkills", async (req, res) => {

})
app.get("/authorize", async (req, res) => {
    const {player_id: playerId, auth_code: authCode} = req.query
    const {clientId, clientSecret} = process.env
    await fetch(`https://api-dot-pgdragonsong.appspot.com/api/dev/retrieve_token?auth_code=${authCode}&client_id=${clientId}&client_secret=${clientSecret}`)
        .then(res => res.json())
        .then(jsonData => console.log(jsonData))
    res.send(`Thank you for authorizing with PG, your player id is: ${playerId} and your code is: ${authCode}`)
})
connectToDb().then(async () => app.listen(port, () => console.log("Cooking With Fire")))

