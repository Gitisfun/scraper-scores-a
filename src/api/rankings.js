import axios from "axios";
import cheerio from "cheerio";
import { RANKINGS_URL } from "../logic/constants/urls.js";
import { withoutLeague } from "../logic/index.js";
import { RankingRow } from "../models/rankingRow.js";

export const fetchRankings = async () => {
  try {
    const response = await axios(RANKINGS_URL);

    const $ = cheerio.load(response.data);
    const content = $(".pageContent");

    let divRow;
    for (const child of content.children()) {
      for (const attr of child.attributes) {
        if (attr.name === "class" && attr.value === "row") {
          divRow = $(child);
        }
      }
    }

    if (!divRow) throw new Error("Div doesn't exist on this element anymore");

    const rankings = [];
    let currentIndex = 0;

    for (const child of divRow.children()) {
      if (child.name === "span") {
        const leagueName = withoutLeague($(child).text());
        rankings.push({ league: leagueName, ranking: [] });
      }
      if (child.name === "div") {
        const table = $(child).find("table");
        const rows = $(table).find("tr");

        for (let j = 0; j < rows.length; j++) {
          const row = rows[j];
          const columns = $(row).find("td");

          const rankingRow = new RankingRow(
            $(columns[0]).text(),
            $(columns[1]).text(),
            $(columns[2]).text(),
            $(columns[3]).text(),
            $(columns[4]).text(),
            $(columns[5]).text(),
            $(columns[6]).text(),
            $(columns[7]).text(),
            $(columns[8]).text()
          );

          if ($(columns[0]).text() && $(columns[1]).text()) {
            rankings[currentIndex].ranking.push(rankingRow);
          }
        }
        currentIndex++;
      }
    }
    return rankings;
  } catch (err) {
    throw new Error("Something went wrong when scraping");
  }
};
