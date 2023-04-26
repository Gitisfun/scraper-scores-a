import express from "express";
import { UNIQUE_COLOR_LIST } from "../api/colors.js";
import {
  createColors,
  deleteAllFromColors,
  getAllColors,
} from "../database/collections/colors.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await getAllColors();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    const deletedResult = await deleteAllFromColors();
    if (!deletedResult.acknowledged) {
      next(new Error("Failed to delete colors"));
    } else {
      const results = await createColors(UNIQUE_COLOR_LIST);
      res.send(results);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
