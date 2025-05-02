import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import DBconnect from "./config/DBConnection.js";
import userRouter from "./routes/userRoutes.js"
import cors from "cors"
const app = express();
DBconnect();

dotenv.config({
    path: ".env"
})

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

//Middlerwares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

//API's
app.use("/api/user", userRouter)

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`)
})