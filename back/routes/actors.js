import express from "express";
import { nextTick } from "process";
import Actor from "../models/Actor.js";
import { createError } from "../utils/error.js";
import Movie from "../models/Movie.js";
import {
  createActor,
  deleteActor,
  getActor,
  getActors,
  updateActor,
} from "../controllers/actor.js";

const router = express.Router();

router.post("/", createActor);

router.put("/:id", updateActor);

router.delete("/:id", deleteActor);

router.get("/:id", getActor);

router.get("/", getActors);

export default router;
