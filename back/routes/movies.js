import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../controllers/movie.js";

const router = express.Router();

router.post("/", createMovie);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie);

router.get("/:id", getMovie);

router.get("/", getMovies);

export default router;
