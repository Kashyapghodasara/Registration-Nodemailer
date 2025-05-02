import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const DBconnect  = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("DataBase Connected ⚙");
    }).catch((error)=> {
        console.log("DB Connection Error", error)
    })
}

export default DBconnect