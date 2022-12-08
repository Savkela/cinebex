import mongoose from "mongoose";
const { Schema } = mongoose;

const HallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
  },
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
  },
  projection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projection",
  },
});

export default mongoose.model("Hall", HallSchema);
