import { getHomeScore, getAwayScore, formatTime } from "../logic/index.js";

export class Game {
  constructor(time, homeTeam, score, awayTeam, date, league) {
    this.id = `${homeTeam}-${awayTeam}-${date}`;
    this.livescore = "";
    this.time = formatTime(time);
    this.homeTeam = homeTeam.trim();
    this.homeScore = getHomeScore(score);
    this.awayTeam = awayTeam.trim();
    this.score = score;
    this.awayScore = getAwayScore(score);
    if (date) this.setDate(date);
    this.league = league;
  }

  setDate(date) {
    this.date = date;
  }
}
