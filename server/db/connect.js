import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({path: "../../.env"})

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.mongoDB, { useNewUrlParser: true,  useUnifiedTopology: true })
    }
    catch (err) {
        console.log(err)
    }
}

