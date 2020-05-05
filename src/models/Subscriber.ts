import mongoose from "mongoose"
const Schema = mongoose.Schema
const Subscriber = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  modified: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model("subscriber", Subscriber)
