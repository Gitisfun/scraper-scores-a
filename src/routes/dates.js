import express from "express";
import { getAllDates } from "../database/collections/dates.js";
import { convertToStringDateList } from "../logic/date.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await getAllDates();
    const temp = convertToStringDateList(results);
    res.send(temp);
  } catch (err) {
    next(err);
  }
});

export default router;
