import mongoose, { ConnectOptions } from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.mongoURI as string,
      {
        useNewUrlParser: true,

        useUnifiedTopology: true,
      } as ConnectOptions
    )

    console.log("MongoDB Connected...")
  } catch (error) {
    console.error(error)
    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB
