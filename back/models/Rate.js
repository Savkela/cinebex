import mongoose from "mongoose";
const { Schema } = mongoose;

const RateSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
});

export default mongoose.model("Rate", RateSchema);
