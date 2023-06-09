import { config } from "./constants/config.js";

export const orderLeagues = (list) => {
  for (const league of list) {
    for (let i = 0; i < config.LEAGUES_ORDER.length; i++) {
      if (league.name === config.LEAGUES_ORDER[i]) {
        league.order = i;
      }
    }
  }
  return list.sort((a, b) => (a.order > b.order ? 1 : -1));
};
