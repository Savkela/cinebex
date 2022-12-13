import mongoose from "mongoose";
const { Schema } = mongoose;

const TechnologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  percentageOnPrice: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  projections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projection",
    },
  ],
  halls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hall",
    },
  ],
});

export default mongoose.model("Technology", TechnologySchema);
