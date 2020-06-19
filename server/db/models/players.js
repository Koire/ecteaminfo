import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid"

const Schema = mongoose.Schema

const playerSchema = new Schema({
    uuid: {type: "String", default: uuidv4},
    userName: { type: "String"},
    passwordHash: {type: "String"},
    playerId: {type: "String"},
    playerName: {type: "String"},
    primarchs: {type: "Array"},
    apiKey: {type: "String"},
    atlasInfo: {type: "Object"},
    baseDefense: {type: "Number"},
    topDragons: {type: "Object"},
    guildPos: {type: "String"},
    online: {type: "Boolean"}
})

export const Player = mongoose.model('players', playerSchema)
