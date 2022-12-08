import mongoose from "mongoose";
const { Schema } = mongoose;

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  distributor: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
    },
  ],
  rates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rate",
    },
  ],
  projections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projection",
    },
  ],
  cinemas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinema",
    },
  ],
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
  ],
});

export default mongoose.model("Movie", MovieSchema);
