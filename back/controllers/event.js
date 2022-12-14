import Cinema from "../models/Cinema.js";
import Event from "../models/Event.js";

export const createEvent = async (req, res, next) => {
  const newEvent = new Event(req.body);
  try {
    const saveEvent = await newEvent.save();
    await Cinema.findByIdAndUpdate(req.body.cinemaId, {
      $push: {
        events: {
          _id: saveEvent.id,
        },
      },
    });
    res.status(200).json(saveEvent);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json("Event has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await event.findById(req.params.id).populate("cinema");
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate("cinema");
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};
