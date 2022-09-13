import express from "express"
import http from "http"
import mongoose from "mongoose"
import connectDB from "./config/db"
import dotenv from "dotenv"
import Logging from "./library/log"
import path from "path"
import userRoutes from "./routes/userRoutes"
import profileRoutes from "./routes/profileRoutes"
import deserializeUser from "./middleware/desetializeUser"
import postRoutes from "./routes/postRoutes"

dotenv.config()
// Connect Database
connectDB().then(() => StartServer())

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(deserializeUser)
/** Only Start Server if Mongoose Connects */
const StartServer = () => {
  /** Log the request */
  app.use((req, res, next) => {
    /** Log the req */
    Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on("finish", () => {
      /** Log the res */
      Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`)
    })

    next()
  })

  /** Rules of our API */
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
      return res.status(200).json({})
    }

    next()
  })
  /** Routes */
  app.get("/api", (req, res, next) => res.json("wsssp"))
  app.use("/api/user", userRoutes)
  app.use("/api/profile", profileRoutes)
  app.use("/api/post", postRoutes)
  
  if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build')
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }

  /** Error handling */
  app.use((req, res, next) => {
    const error = new Error("Not found")

    Logging.error(error)

    res.status(404).json({
      message: error.message,
    })
  })

  const PORT = process.env.port || (5000 as number)

  /** starting server */
  app.listen(PORT, () => Logging.info(`Server started on port ${PORT}`))
}
