import express from "express";
import {
  createHall,
  deleteHall,
  getHall,
  getHalls,
  updateHall,
} from "../controllers/hall.js";

const router = express.Router();

router.post("/", createHall);

router.put("/:id", updateHall);

router.delete("/:id", deleteHall);

router.get("/:id", getHall);

router.get("/", getHalls);

export default router;
