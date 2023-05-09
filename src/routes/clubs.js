import express from "express";
import { UNIQUE_COLOR_LIST } from "../api/colors.js";
import { getAllClubs, getClub } from "../database/collections/clubs.js";
import { getAllColors } from "../database/collections/colors.js";
import { getAllGamesFromClub } from "../database/collections/games.js";
import Colors from "../logic/colors.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const clubs = await getAllClubs();
    res.send(clubs);
  } catch (err) {
    next(err);
  }
});

router.get("/match", async (req, res, next) => {
  try {
    const home = req.query.home;
    const away = req.query.away;

    if (home && away) {
      const homeTeam = await getClub({ name: home });
      const awayTeam = await getClub({ name: away });

      const homeTeamMatches = await getAllGamesFromClub({
        $or: [{ homeTeam: home }, { awayTeam: home }],
      });
      const awayTeamMatches = await getAllGamesFromClub({
        $or: [{ homeTeam: away }, { awayTeam: away }],
      });

      //const colors = await getAllColors();
      const colors = UNIQUE_COLOR_LIST;
      console.log(colors);
      console.log("COLORS");
      console.log(homeTeam.shirtColor);
      console.log(homeTeam.pantsColor);
      console.log(awayTeam.shirtColor);
      console.log(awayTeam.pantsColor);
      homeTeam.kit = {
        shirt: Colors.getColors(colors, homeTeam.shirtColor),
        pants: Colors.getColors(colors, homeTeam.pantsColor),
      };
      awayTeam.kit = {
        shirt: Colors.getColors(colors, awayTeam.shirtColor),
        pants: Colors.getColors(colors, awayTeam.pantsColor),
      };

      console.log("homeTeam.kit");
      console.log(homeTeam.kit);
      console.log("awayTeam.kit");
      console.log(awayTeam.kit);

      res.send({ homeTeam, awayTeam, homeTeamMatches, awayTeamMatches });
    } else {
      throw new Error("No params");
    }
  } catch (err) {
    next(err);
  }
});

export default router;
