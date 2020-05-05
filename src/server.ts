import express from "express"
import mongoose from "mongoose"
import keys from "./config/keys"
import subscribers from "./routes/api/subscribers"

const main = async (): Promise<void> => {
  const app = express()
  app.use(express.json())
  try {
    await mongoose.connect(keys.mongoURI)
    console.log("MongoDB connected...")
  } catch (e) {
    console.error("ERROR:\n", e)
    process.exit(-1)
  }

  app.use("/api/subs", subscribers)

  const port = process.env.PORT || 5000
  app.listen(port, () => console.log(`Server started on port ${port}`))
}

main()
