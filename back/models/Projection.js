import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectionSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
  },
  tehnology: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technology",
  },
});

export default mongoose.model("Projection", ProjectionSchema);
