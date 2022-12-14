import express from "express";
import { nextTick } from "process";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.js";
import Cinema from "../models/Cinema.js";
import Event from "../models/Event.js";
import { createError } from "../utils/error.js";

const router = express.Router();

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

router.get("/:id", getEvent);

router.get("/", getEvents);

export default router;
