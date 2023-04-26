export class RankingRow {
  constructor(
    order,
    team,
    played,
    win,
    lose,
    draw,
    goalsFor,
    goalsAgainst,
    points
  ) {
    this.order = order;
    this.team = team;
    this.played = played;
    this.win = win;
    this.lose = lose;
    this.draw = draw;
    this.goalsFor = goalsFor;
    this.goalsAgainst = goalsAgainst;
    this.points = points;
  }
}
