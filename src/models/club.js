import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import { LEAGUES_MAP } from "../logic/constants/league.js";
import { removeSubstring } from "../logic/index.js";

export class Club {
  constructor() {
    this.id = uuidv4();
  }

  setName(name) {
    this.name = name.trim();
    this.slug = slugify(name.trim());
  }

  setLeague(league) {
    this.league = league.trim();
    this.setLeagueFullName(league);
  }

  setLeagueFullName(league) {
    this.leagueFullName = LEAGUES_MAP(league.trim());
  }

  setColors(colors) {
    const withoutKleuren = removeSubstring(colors, "Kleuren");
    const list = withoutKleuren.split(" - ");
    this.shirtColor = removeSubstring(list[0].toLowerCase(), "trui:");
    this.pantsColor = removeSubstring(list[1].toLowerCase(), "broek:");
    //this.colors = list;
  }

  setAddress(address) {
    const withoutTerrein = removeSubstring(address, "Terrein:");
    const list = withoutTerrein.split(" - ");

    if (list.length === 3) {
      this.street = list[1];
      this.county = removeSubstring(list[2], "-");
    } else if (list.length >= 4) {
      this.street = list[2];
      this.county = removeSubstring(list[3], "-");
    }
  }

  setRemark(remark) {
    this.remark = remark.trim();
  }

  setArtificial(artificial) {
    this.artificial = artificial.trim();
  }
}
