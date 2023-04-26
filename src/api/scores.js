import axios from "axios";
import cheerio from "cheerio";
import { SCORES_URL } from "../logic/constants/urls.js";
import { formatDateToString, formatToCorrectDate } from "../logic/date.js";
import { cleanScoreRoundTitle, reverseText, withoutJibberish } from "../logic/index.js";
import { exists } from "../logic/scraper.js";
import { Game } from "../models/game.js";

export const fetchScores = async () => {
  try {
    const response = await axios.get(SCORES_URL);
    if (response) {
      const $ = cheerio.load(response.data);

      const content = $(".pageContent");
      const root = findRoot($, content);
      const rounds = findRounds($, root);
      const dates = findDates($, root);
      const games = scrapeRounds($, rounds);
      return { dates, games };
    }
    return null;
  } catch (err) {
    throw new Error("Something went wrong when scraping root");
  }
};

const findDates = ($, root) => {
  try {
    const temp = $(root).find(".speeldag");
    let dates = [];
    for (let i = 0; i < temp.length; i++) {
      const date = $(temp[i]).text();
      const dateOnly = withoutJibberish(date, "expand_moreSpeeldag");
      const tempDate = formatToCorrectDate(dateOnly);
      const formattedDate = formatDateToString(tempDate);
      dates.push({ round: formattedDate });
    }
    return dates;
  } catch (err) {
    throw new Error("Something went wrong when scraping root");
  }
};

const findRoot = ($, root) => {
  try {
    const temp = $(root).find("table");
    return $(temp.first()).find("tbody").first();
  } catch (err) {
    throw new Error("Something went wrong when scraping root");
  }
};

const findRounds = ($, root) => {
  try {
    const temp = $(root).children();

    return temp;
  } catch (err) {
    throw new Error("Something went wrong when finding rounds");
  }
};

const scrapeRounds = ($, root) => {
  try {
    const dateList = [];
    const roundList = [];
    for (let i = 0; i < root.length; i++) {
      const element = root[i];
      if (i % 2 === 0) {
        const span = $(element).find("span");
        const date = cleanScoreRoundTitle($(span).text());
        const tempDate = formatToCorrectDate(date);
        const formattedDate = formatDateToString(tempDate);
        dateList.push(formattedDate);
      } else {
        roundList.push(element);
      }
    }

    const games = [];

    for (let i = 0; i < root.length / 2; i++) {
      const table = $(roundList[i]).find("tbody").children();
      let tempLeague;
      for (let j = 0; j < table.length; j++) {
        const row = table[j];

        if (exists($, row, "b")) {
          tempLeague = $(row).text();
        } else {
          const columns = $(row).children();

          if (columns.length === 8) {
            const homeTeam = $(columns[0]).text();
            const awayTeam = $(columns[2]).text();
            const homeScore = $(columns[4]).text();
            const awayScore = $(columns[6]).text();
            const score = `${homeScore} - ${awayScore}`;
            const game = new Game("", homeTeam, score, awayTeam, dateList[i], tempLeague);
            games.push(game);
          }
          if (columns.length === 5) {
            const homeTeam = $(columns[0]).text();
            const awayTeam = $(columns[2]).text();
            const score = "UITGESTELD";
            const game = new Game("", homeTeam, score, awayTeam, dateList[i], tempLeague);
            games.push(game);
          }
        }
      }
    }
    return games;
  } catch (err) {
    throw new Error("Something went wrong when scraping games");
  }
};
