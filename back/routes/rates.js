import express from "express";
import {
  createRate,
  deleteRate,
  getRate,
  getRates,
  updateRate,
} from "../controllers/rate.js";

const router = express.Router();

router.post("/", createRate);

router.put("/:id", updateRate);

router.delete("/:id", deleteRate);

router.get("/:id", getRate);

router.get("/", getRates);

export default router;
