import express from "express";
import { UNIQUE_COLOR_LIST } from "../api/colors.js";
import { getAllClubs, getClub } from "../database/collections/clubs.js";
import { getAllColors } from "../database/collections/colors.js";
import { getAllGamesFromClub } from "../database/collections/games.js";
import { getRanking } from "../database/collections/rankings.js";
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
      const homeTeam = await getClub({ name: { $regex: home, $options: "i" } });
      const awayTeam = await getClub({ name: { $regex: away, $options: "i" } });

      const homeTeamMatches = await getAllGamesFromClub({
        $or: [{ homeTeam: home }, { awayTeam: home }],
      });
      const awayTeamMatches = await getAllGamesFromClub({
        $or: [{ homeTeam: away }, { awayTeam: away }],
      });

      const colors = UNIQUE_COLOR_LIST;

      homeTeam.kit = {
        shirt: Colors.getColors(colors, homeTeam.shirtColor),
        pants: Colors.getColors(colors, homeTeam.pantsColor),
      };
      awayTeam.kit = {
        shirt: Colors.getColors(colors, awayTeam.shirtColor),
        pants: Colors.getColors(colors, awayTeam.pantsColor),
      };

      res.send({ homeTeam, awayTeam, homeTeamMatches, awayTeamMatches });
    } else {
      throw new Error("No params");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const slug = req.params.slug;

    if (slug) {
      const teamInfo = await getClub({ slug });

      const matches = await getAllGamesFromClub({
        $or: [{ homeTeam: teamInfo?.name }, { awayTeam: teamInfo?.name }],
      });

      const ranking = await getRanking({ league: teamInfo?.leagueFullName });

      res.send({ ...teamInfo, matches: matches, ranking });
    } else {
      throw new Error("No params");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});



export default router;
