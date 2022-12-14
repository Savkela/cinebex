import express from "express";
import {
  createTechnology,
  deleteTechnology,
  getTechnologies,
  getTechnology,
  updateTechnology,
} from "../controllers/technology.js";

const router = express.Router();

router.post("/", createTechnology);

router.put("/:id", updateTechnology);

router.delete("/:id", deleteTechnology);

router.get("/:id", getTechnology);

router.get("/", getTechnologies);

export default router;
