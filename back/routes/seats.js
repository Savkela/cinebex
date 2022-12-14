import express from "express";
import {
  createSeat,
  deleteSeat,
  getSeat,
  getSeats,
  updateSeat,
} from "../controllers/seat.js";

const router = express.Router();

router.post("/", createSeat);

router.put("/:id", updateSeat);

router.delete("/:id", deleteSeat);

router.get("/:id", getSeat);

router.get("/", getSeats);

export default router;
