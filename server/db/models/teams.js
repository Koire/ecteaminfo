import {v4 as uuidv4} from "uuid"
import mongoose from "mongoose";

const Schema = mongoose.Schema

const teamSchema = new Schema({
    uuid: {type: "String", default: uuidv4},
    name: {type: "String"},
    elo: {type: "Number"},
    roster: {type: "Array"},
    leagueInfo: {type: "Object"},
    influence: {type: "Number"},
    activeness: {type: "Object"},
    mapColors: {type: "Object"},
    powerRank: {type: "Number"},
    capital: {type: "Array"},
    castles: {type: "Array"}
})

export const Team = mongoose.model('teams', teamSchema)
