import express from "express";
import { nextTick } from "process";
import {
  createCinema,
  deleteCinema,
  getCinema,
  getCinemas,
  updateCinema,
} from "../controllers/cinema.js";
import Cinema from "../models/Cinema.js";
import { createError } from "../utils/error.js";

const router = express.Router();

router.post("/", createCinema);

router.put("/:id", updateCinema);

router.delete("/:id", deleteCinema);

router.get("/:id", getCinema);

router.get("/", getCinemas);

export default router;
