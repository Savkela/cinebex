import express from "express";
import { nextTick } from "process";
import Equipment from "../models/Equipment.js";
import { createError } from "../utils/error.js";
import Cinema from "../models/Cinema.js";
import {
  createEquipment,
  deleteEquipment,
  getEquipment,
  getEquipments,
  updateEquipment,
} from "../controllers/equipment.js";

const router = express.Router();

router.post("/", createEquipment);

router.put("/:id", updateEquipment);

router.delete("/:id", deleteEquipment);

router.get("/:id", getEquipment);

router.get("/", getEquipments);

export default router;
