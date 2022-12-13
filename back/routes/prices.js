import express from "express";
import Price from "../models/Price.js";
import Cinema from "../models/Cinema.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newPrice = new Price(req.body);
  try {
    const savePrice = await newPrice.save();
    await Cinema.findByIdAndUpdate(req.body.cinemaId, {
      $push: {
        prices: {
          _id: savePrice.id,
        },
      },
    });
    res.status(200).json(savePrice);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedPrice = await Price.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPrice);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await Price.findByIdAndDelete(req.params.id);
    res.status(200).json("Price has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Price = await Price.findById(req.params.id);
    res.status(200).json(Price);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getAll

router.get("/", async (req, res, next) => {
  try {
    const Prices = await Price.find().populate("cinema");
    res.status(200).json(Prices);
  } catch (err) {
    next(err);
  }
});

export default router;
