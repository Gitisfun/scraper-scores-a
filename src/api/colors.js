import Colors from "../logic/colors.js";
import Kit from "../logic/constants/kit.js";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const scrapeColors = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = fs.readFileSync(`${__dirname}/clubs.html`);
    const $ = cheerio.load(file);

    const kleurenDivs = $('div.col-md-12:contains("Kleuren")');
    const allColors = [];

    kleurenDivs.each((index, element) => {
      const parts = $(element).text().split(" - ");

      const part1 = parts[0].replace("Kleuren Trui: ", "");
      const part2 = parts[1].replace("Broek:", "");
      allColors.push(part1);
      allColors.push(part2);
    });
    const uniqueColors = allColors.map((color) => color.trim().toLowerCase()).filter((color, index) => allColors.indexOf(color) === index);
    console.log(uniqueColors);
    return kleurenDivs;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const UNIQUE_COLOR_LIST = [
  { code: "zwart met extra andere kleuren aan voorkant", kit: Kit.SINGLE, colors: [Colors.GOLD] },
  { code: "blauw (goud accent)", kit: Kit.SINGLE, colors: [Colors.BLUE] },
  { code: "zwart wit (verticale strepen)", kit: Kit.SINGLE, colors: [Colors.BLACK] },
  { code: "wit met goude details", kit: Kit.SINGLE, colors: [Colors.WHITE] },
  { code: "zwart met goude details", kit: Kit.SINGLE, colors: [Colors.BLACK] },

  { code: "goud", kit: Kit.SINGLE, colors: [Colors.GOLD] },
  { code: "blauw", kit: Kit.SINGLE, colors: [Colors.BLUE] },
  { code: "overwegend blauw", kit: Kit.SINGLE, colors: [Colors.BLUE] },
  { code: "rood", kit: Kit.SINGLE, colors: [Colors.RED] },
  { code: "wit", kit: Kit.SINGLE, colors: [Colors.WHITE] },
  { code: "groen", kit: Kit.SINGLE, colors: [Colors.GREEN] },
  { code: "wit blauw", kit: Kit.MULTIPLE, colors: [Colors.WHITE, Colors.BLUE] },
  { code: "rood wit", kit: Kit.MULTIPLE, colors: [Colors.RED, Colors.WHITE] },
  { code: "wit-groen", kit: Kit.MULTIPLE, colors: [Colors.WHITE, Colors.GREEN] },
  { code: "zwart", kit: Kit.SINGLE, colors: [Colors.BLACK] },
  { code: "zwart/grijs", kit: Kit.MULTIPLE, colors: [Colors.BLACK, Colors.GREY] },
  { code: "zwart wit", kit: Kit.MULTIPLE, colors: [Colors.BLACK, Colors.WHITE] },
  { code: "oranje", kit: Kit.SINGLE, colors: [Colors.ORANGE] },
  {
    code: "donkerblauw-rood",
    kit: Kit.MULTIPLE,
    colors: [Colors.DARK_BLUE, Colors.RED],
  },
  { code: "paars", kit: Kit.SINGLE, colors: [Colors.PURPLE] },
  { code: "geel", kit: Kit.SINGLE, colors: [Colors.YELLOW] },
  { code: "donkergrijs", kit: Kit.SINGLE, colors: [Colors.DARK_GREY] },
  { code: "donker grijs", kit: Kit.SINGLE, colors: [Colors.DARK_GREY] },
  {
    code: "oranje met zwarte veegprint",
    kit: Kit.MULTIPLE,
    colors: [Colors.ORANGE, Colors.BLACK],
  },
  {
    code: "wit-rood gestreept",
    kit: Kit.STRIPED,
    colors: [Colors.WHITE, Colors.RED],
  },
  {
    code: "zalm of wit",
    kit: Kit.MULTIPLE,
    colors: [Colors.SALMON, Colors.WHITE],
  },
  {
    code: "paars/zwart",
    kit: Kit.MULTIPLE,
    colors: [Colors.PURPLE, Colors.BLACK],
  },
  { code: "rood/zwart", kit: Kit.MULTIPLE, colors: [Colors.RED, Colors.BLACK] },
  { code: "zwart/rood", kit: Kit.MULTIPLE, colors: [Colors.RED, Colors.BLACK] },
  {
    code: "blauw en geel",
    kit: Kit.MULTIPLE,
    colors: [Colors.BLUE, Colors.YELLOW],
  },
  { code: "rood-wit", kit: Kit.MULTIPLE, colors: [Colors.RED, Colors.WHITE] },
  { code: "rood zwart", kit: Kit.MULTIPLE, colors: [Colors.RED, Colors.BLACK] },
  {
    code: "zwart / wit",
    kit: Kit.MULTIPLE,
    colors: [Colors.BLACK, Colors.WHITE],
  },
  { code: "groen-wit", kit: Kit.MULTIPLE, colors: [Colors.GREEN, Colors.WHITE] },
  { code: "groen-wit", kit: Kit.STRIPED, colors: [Colors.GREEN, Colors.WHITE] },
  { code: "groen/wit", kit: Kit.MULTIPLE, colors: [Colors.GREEN, Colors.WHITE] },
  { code: "bordeaux", kit: Kit.SINGLE, colors: [Colors.BORDEAUX] },
  { code: "bordeau", kit: Kit.SINGLE, colors: [Colors.BORDEAUX] },
  { code: "licht blauw", kit: Kit.SINGLE, colors: [Colors.LIGHT_BLUE] },
  { code: "blauwe", kit: Kit.SINGLE, colors: [Colors.BLUE] },
  {
    code: "blauw met gele strepen",
    kit: Kit.STRIPED,
    colors: [Colors.BLUE, Colors.YELLOW],
  },
  {
    code: "blauw-turquoise",
    kit: Kit.MULTIPLE,
    colors: [Colors.BLUE, Colors.TURQUOISE],
  },
  { code: "rode", kit: Kit.SINGLE, colors: [Colors.RED] },
  { code: "rode/witte", kit: Kit.MULTIPLE, colors: [Colors.RED, Colors.WHITE] },
  {
    code: "wit met groene strepen",
    kit: Kit.STRIPED,
    colors: [Colors.WHITE, Colors.GREEN],
  },
  { code: "zalm-kleur", kit: Kit.SINGLE, colors: [Colors.SALMON] },
  {
    code: "geel/zwart",
    kit: Kit.MULTIPLE,
    colors: [Colors.YELLOW, Colors.BLACK],
  },
  { code: "blauw/wit", kit: Kit.MULTIPLE, colors: [Colors.BLUE, Colors.WHITE] },
  { code: "blauw/zwart", kit: Kit.MULTIPLE, colors: [Colors.BLUE, Colors.BLACK] },
  { code: "blauw/wit", kit: Kit.STRIPED, colors: [Colors.BLUE, Colors.WHITE] },
  { code: "blauw/geel", kit: Kit.MULTIPLE, colors: [Colors.BLUE, Colors.YELLOW] },
  {
    code: "oranje/zwart",
    kit: Kit.MULTIPLE,
    colors: [Colors.ORANGE, Colors.BLACK],
  },
  {
    code: "zwart/oranje",
    kit: Kit.MULTIPLE,
    colors: [Colors.BLACK, Colors.ORANGE],
  },
  {
    code: "zwart/geel gestreept",
    kit: Kit.STRIPED,
    colors: [Colors.BLACK, Colors.YELLOW],
  },
  {
    code: "lichtblauw",
    kit: Kit.MULTIPLE,
    colors: [Colors.LIGHT_BLUE],
  },
  {
    code: "donkerblauw",
    kit: Kit.MULTIPLE,
    colors: [Colors.DARK_BLUE],
  },
  {
    code: "lichtblauw/donkerblauw",
    kit: Kit.MULTIPLE,
    colors: [Colors.LIGHT_BLUE, Colors.DARK_BLUE],
  },
  { code: "grijs", kit: Kit.SINGLE, colors: [Colors.GREY] },
  { code: "donkergroen", kit: Kit.SINGLE, colors: [Colors.DARK_GREEN] },
  {
    code: "bordeaux/donker blauw",
    kit: Kit.MULTIPLE,
    colors: [Colors.BORDEAUX, Colors.DARK_BLUE],
  },
  { code: "donker blauw", kit: Kit.MULTIPLE, colors: [Colors.DARK_BLUE] },
];
