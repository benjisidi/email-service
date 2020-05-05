import dotenv from "dotenv"
dotenv.config()
export default {
  mongoURI: `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@subscribers-hfznt.mongodb.net/test?retryWrites=true&w=majority`,
}
