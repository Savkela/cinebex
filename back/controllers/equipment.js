import Cinema from "../models/Cinema.js";
import Equipment from "../models/Equipment.js";

export const createEquipment = async (req, res, next) => {
  const newEquipment = new Equipment(req.body);
  try {
    const saveEquipment = await newEquipment.save();
    await Cinema.findByIdAndUpdate(req.body.cinemaId, {
      $push: {
        equipments: {
          _id: saveEquipment.id,
        },
      },
    });
    res.status(200).json(saveEquipment);
  } catch (err) {
    next(err);
  }
};

export const updateEquipment = async (req, res, next) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedEquipment);
  } catch (err) {
    next(err);
  }
};

export const deleteEquipment = async (req, res, next) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.status(200).json("Equipment has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getEquipment = async (req, res, next) => {
  try {
    const Equipment = await Equipment.findById(req.params.id).populate(
      "cinema"
    );
    res.status(200).json(Equipment);
  } catch (err) {
    next(err);
  }
};

export const getEquipments = async (req, res, next) => {
  try {
    const Equipments = await Equipment.find().populate("cinema");
    res.status(200).json(Equipments);
  } catch (err) {
    next(err);
  }
};
