import express from "express";
import { getAllDates } from "../database/collections/dates.js";
import { getGames, getAllGames } from "../database/collections/games.js";
import { convertToDateList, convertToEnglishDate, findClosestDateIndex } from "../logic/date.js";
import { buildRound, buildLeague } from "../logic/responseBuilder.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await getAllGames();
  res.send(result);
});

router.get("/round", async (req, res, next) => {
  try {
    if (req.query.date) {
      const date = convertToEnglishDate(req.query.date);
      const result = await getGames({ date });

      const list = buildRound(result);

      res.send({ leagues: list });
    } else {
      const dates = await getAllDates();
      const convertedDates = convertToDateList(dates);
      const index = findClosestDateIndex(convertedDates);
      const closestDate = dates[index].round;

      const result = await getGames({ date: closestDate });
      const list = buildRound(result);
      res.send({ leagues: list });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/league", async (req, res, next) => {
  const league = req.query.league;

  if (league) {
    const result = await getGames({ league });
    const list = buildLeague(result);
    res.send(list);
  } else {
    res.send([]);
  }
});

export default router;
