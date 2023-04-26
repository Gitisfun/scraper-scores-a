import express from "express";
import {
  getAllRankings,
  getRanking,
} from "../database/collections/rankings.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const league = req.query.league;
    if (league) {
      const result = await getRanking({ league });
      res.send(result);
    } else {
      const result = await getAllRankings();
      res.send(result);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
