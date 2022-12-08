import mongoose from "mongoose";
const { Schema } = mongoose;

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
});

export default mongoose.model("Genre", GenreSchema);
