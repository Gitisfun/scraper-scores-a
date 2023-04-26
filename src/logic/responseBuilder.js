import { orderLeagues } from "./league.js";

export const buildRound = (result) => {
  try {
    const list = [];
    for (const game of result) {
      if (!list.includes(game.league)) {
        list.push(game.league);
      }
    }
    const resultList = [];
    for (const league of list) {
      resultList.push({ name: league, games: [] });
    }
    for (const game of result) {
      for (const league of resultList) {
        if (league.name === game.league) {
          league.games.push(game);
        }
      }
    }
    const temp = orderLeagues(resultList);
    return temp;
  } catch (err) {
    throw new Error("Error occured when building round");
  }
};

export const buildLeague = (result) => {
  try {
    const dateList = [];
    for (const game of result) {
      if (!dateList.includes(game.date)) {
        dateList.push(game.date);
      }
    }

    const resultList = [];
    for (const date of dateList) {
      resultList.push({ date: date, games: [] });
    }

    for (const game of result) {
      for (const round of resultList) {
        if (round.date === game.date) {
          round.games.push(game);
        }
      }
    }

    return resultList;
  } catch (err) {
    throw new Error("Error occured when building league");
  }
};
