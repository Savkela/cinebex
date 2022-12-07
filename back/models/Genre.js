import mongoose from "mongoose";
const { Schema } = mongoose;

const CinemaShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  workHour: {
    type: String,
    required: true,
  },
  parking: {
    type: String,
    required: true,
  },
  events: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
});

export default mongoose.model("Cinema", CinemaShema);
