import express from "express";
import {
  createGenre,
  deleteGenre,
  getGenre,
  getGenres,
  updateGenre,
} from "../controllers/genre.js";

const router = express.Router();

router.post("/", createGenre);

router.put("/:id", updateGenre);

router.delete("/:id", deleteGenre);

router.get("/:id", getGenre);

router.get("/", getGenres);

export default router;
