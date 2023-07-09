import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { removeSubstring } from "../logic/index.js";
import { Club } from "../models/club.js";

const ROW_COLORS = "Kleuren";
const ROW_ADDRESS = "Terrein";
const ROW_DIRECTIONS = "Wegwijzer";
const ROW_REMARK = "Opmerking";
const ROW_ARTIFICIAL = "OPGELET KUNSTGRAS";

export const fetchClubs = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = fs.readFileSync(`${__dirname}/clubs.html`);
    const $ = cheerio.load(file);

    const evenRows = $(".row-even");

    const list = [];
    // Loop through even rows and extract club names and details
    evenRows.each((i, row) => {
      const club = new Club();

      const clubName = $(row).find(".col-md-3").text().trim();
      const league = $(row).find(".col-md-1").last().text().trim();

      club.setName(clubName);
      club.setLeague(league);

      const details = $(row).next(".row");

      details.find(".row").each(function () {
        const text = $(this).text().trim();

        if (text.includes(ROW_COLORS)) {
          club.setColors(text);
        }

        if (text.includes(ROW_ADDRESS) && !text.includes(ROW_DIRECTIONS)) {
          club.setAddress(text);
        }

        if (text.includes(ROW_REMARK)) {
          const temp = removeSubstring(text, "Opmerking:");
          club.setRemark(temp);
        }

        if (text.includes(ROW_ARTIFICIAL)) {
          club.setArtificial(text);
        }
      });
      list.push(club);
    });

    return list;
  } catch (err) {
    throw new Error("Something went wrong when scraping");
  }
};
