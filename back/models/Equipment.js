import mongoose from "mongoose";
const { Schema } = mongoose;

const EquipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
  },
});

export default mongoose.model("Equipment", EquipmentSchema);
