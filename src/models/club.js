import { v4 as uuidv4 } from "uuid";
import { removeSubstring } from "../logic/index.js";

export class Club {
  constructor() {
    this.id = uuidv4();
  }

  setName(name) {
    this.name = name.trim();
  }

  setColors(colors) {
    const withoutKleuren = removeSubstring(colors, "Kleuren");
    const list = withoutKleuren.split(" - ");
    this.shirtColor = removeSubstring(list[0].toLowerCase(), "trui:");
    this.pantsColor = removeSubstring(list[1].toLowerCase(), "broek:");
    this.colors = list;
  }

  setAddress(address) {
    const withoutTerrein = removeSubstring(address, "Terrein:");
    const list = withoutTerrein.split(" - ");
    if (list.length >= 3) {
      this.stadium = list[0];
      this.street = list[1];
      this.county = removeSubstring(list[2], "-");
    }
  }

  setRemark(remark) {
    this.remark = remark.trim();
  }

  setArtificial(artificial) {
    this.artificial = artificial.trim();
  }
}
