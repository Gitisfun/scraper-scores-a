import { LEAGUES_ORDER } from "./constants/league.js";

export const orderLeagues = (list) => {
  for (const league of list) {
    for (let i = 0; i < LEAGUES_ORDER.length; i++) {
      if (league.name === LEAGUES_ORDER[i]) {
        league.order = i;
      }
    }
  }
  return list.sort((a, b) => (a.order > b.order ? 1 : -1));
};
