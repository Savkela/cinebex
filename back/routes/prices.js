import express from "express";
import {
  createPrice,
  deletePrice,
  getPrice,
  getPrices,
  updatePrice,
} from "../controllers/price.js";

const router = express.Router();

router.post("/", createPrice);

router.put("/:id", updatePrice);

router.delete("/:id", deletePrice);

router.get("/:id", getPrice);

router.get("/", getPrices);

export default router;
