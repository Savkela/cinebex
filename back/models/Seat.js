import mongoose from "mongoose";
const { Schema } = mongoose;

const SeatShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["free", "taked", "unavailable", "disabled", "freeVip"],
    default: "free",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  row: {
    type: Number,
    required: true,
    min: 1,
    max: 50,
  },
  nubmer: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Seat", SeatShema);
