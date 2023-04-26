import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { removeSubstring } from "../logic/index.js";
import { Club } from "../models/club.js";

const ROW_COLORS = "Kleuren";
const ROW_ADDRESS = "Terrein";
const ROW_REMARK = "Opmerking";
const ROW_ARTIFICIAL = "OPGELET KUNSTGRAS";

const SINGLE = "Enkelvoudig";
const MULTI = "Meerdere";
const STRIPED = "Gestreept";

const getKitStyle = (text) => {
  if (text.includes("strep") || text.includes("streep")) return STRIPED;
  else if (
    text.trim().includes("-") ||
    text.trim().includes(" ") ||
    text.trim().includes("/")
  )
    return MULTI;
  return SINGLE;
};

export const fetchClubs = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = fs.readFileSync(`${__dirname}/clubs.html`);
    const $ = cheerio.load(file);

    const content = $(".table-responsive");
    const rows = $(content).children();

    let isPastFirstRow = false;
    const list = [];

    let club = new Club();
    for (const row of rows) {
      const value = $(row).text();

      if ($(row).hasClass("row-even")) {
        if (isPastFirstRow) {
          list.push(club);
          club = new Club();
        }

        isPastFirstRow = true;

        const columns = $(row).children();
        club.setName($(columns[1]).text());
      }

      if ($(row).text().includes(ROW_COLORS)) {
        // club.colors = $(row).text();
        club.setColors(value);
      }

      if (value.includes(ROW_ADDRESS)) {
        // club.address = $(row).text();
        club.setAddress(value);
      }

      if (value.includes(ROW_REMARK)) {
        const temp = removeSubstring(value, "Opmerking:");
        club.setRemark(temp);
      }

      if (value.includes(ROW_ARTIFICIAL)) {
        club.setArtificial(value);
      }
    }
    list.push(club);

    const colorList = [];
    const uniqueColorList = [];

    for (let i = 0; i < list.length; i++) {
      const a = list[i].shirtColor.replace("trui:", "").trim();
      const b = list[i].pantsColor.replace("broek:", "").trim();
      if (!uniqueColorList.includes(a)) {
        const temp = {
          code: a,
          kit: getKitStyle(a),
        };
        colorList.push(temp);
        uniqueColorList.push(a);
      }
      if (!uniqueColorList.includes(b)) {
        const temp = {
          code: b,
          kit: getKitStyle(b),
        };
        colorList.push(temp);
        uniqueColorList.push(b);
      }
    }

    return list;
  } catch (err) {
    throw new Error("Something went wrong when scraping");
  }
};
