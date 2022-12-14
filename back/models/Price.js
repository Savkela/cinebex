import mongoose from "mongoose";
const { Schema } = mongoose;

const PriceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
    required: false,
  },
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
  },
});

export default mongoose.model("Price", PriceSchema);
