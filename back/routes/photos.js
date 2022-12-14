import express from "express";
import {
  createPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
} from "../controllers/photo.js";

const router = express.Router();

//create
router.post("/", createPhoto);

//update
router.put("/:id", updatePhoto);

//delete
router.delete("/:id", deletePhoto);

//get
router.get("/:id", getPhoto);

//getAll

router.get("/", getPhotos);

export default router;
