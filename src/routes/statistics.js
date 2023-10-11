import express from "express";
import {
  getVisited,
  incrementVisited,
} from "../database/collections/statistics.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const obj = await getVisited();
    res.send(obj);
  } catch (err) {
    next(err);
  }
});
router.get("/increment", async (req, res, next) => {
  try {
    const obj = await getVisited();
    const incrementedValue = obj.visited + 1;
    const result = await incrementVisited(obj._id, incrementedValue);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

export default router;
