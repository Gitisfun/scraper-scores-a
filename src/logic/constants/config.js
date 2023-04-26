import { RANKINGS_URL, SCHEDULE_URL, SCORES_URL } from "./urls.js";
import { LEAGUES_ORDER } from "./league.js";

export const config = {
  DATABASE_NAME: "antwerpen",
  LEAGUES_ORDER: LEAGUES_ORDER,
  URLS: {
    RANKINGS_URL: RANKINGS_URL,
    SCHEDULE_URL: SCHEDULE_URL,
    SCORES_URL: SCORES_URL,
  },
};
