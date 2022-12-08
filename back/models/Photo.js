import mongoose from "mongoose";
const { Schema } = mongoose;

const PhotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
});

export default mongoose.model("Photo", PhotoSchema);
