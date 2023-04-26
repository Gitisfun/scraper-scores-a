import axios from "axios";
import cheerio from "cheerio";
import { SCHEDULE_URL } from "../logic/constants/urls.js";
import { convertToEnglishDate } from "../logic/date.js";
import { withoutDay } from "../logic/index.js";
import { Game } from "../models/game.js";

export const fetchGamesAndDates = async () => {
  try {
    const response = await axios.get(SCHEDULE_URL);
    if (response) {
      const $ = cheerio.load(response.data);

      const content = $(".pageContent");

      let tempDate = null;
      let currentLeague = null;

      let dates = [];
      let games = [];

      for (const child of content.children()) {
        const text = $(child).text();

        if (child.name === "center") {
          if (text.includes("dag")) {
            tempDate = withoutDay(convertToEnglishDate(text));
            dates.push({ round: tempDate });
          } else if (text.includes("AFDELING")) {
            currentLeague = text;
          }
        }
        if (child.name === "table") {
          const table = $(child);

          const rows = $(table).find("tr");

          for (let j = 0; j < rows.length; j++) {
            const row = rows[j];
            const columns = $(row).find("td");

            const time = $(columns[0]).text();
            const homeTeam = $(columns[2]).text();
            const score = $(columns[3]).text();
            const awayTeam = $(columns[4]).text();
            const game = new Game(
              time,
              homeTeam,
              score,
              awayTeam,
              tempDate,
              currentLeague
            );
            games.push(game);
          }
        }
      }
      return { games, dates };
    }
    return null;
  } catch (err) {
    throw new Error("Something went wrong when scraping");
  }
};
