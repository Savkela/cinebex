import express from "express";
import {
  createProjection,
  deleteProjection,
  getProjection,
  getProjections,
  updateProjection,
} from "../controllers/projection.js";

const router = express.Router();

router.post("/", createProjection);

router.put("/:id", updateProjection);

router.delete("/:id", deleteProjection);

router.get("/:id", getProjection);

router.get("/", getProjections);

export default router;
