import { fetchClubs } from "../api/clubs.js";
import { fetchGamesAndDates } from "../api/games.js";
import { fetchRankings } from "../api/rankings.js";
import { fetchScores } from "../api/scores.js";
import { createClubs, deleteAllFromClubs } from "../database/collections/clubs.js";
import { createDates, deleteAllFromDates } from "../database/collections/dates.js";
import { createGames, deleteAllFromGames } from "../database/collections/games.js";
import { createRankings, deleteAllFromRankings } from "../database/collections/rankings.js";

const removeDuplicates = (data) => {
  let uniqueData = data.reduce((acc, obj) => {
    // Check if the score property is not empty
    if (obj.score !== "-") {
      // Check if the current object has a duplicate ID
      let existingObj = acc.find((t) => t.id === obj.id);
      if (!existingObj) {
        acc.push(obj);
      } else if (existingObj.score === "-") {
        // If the existing object has no score, replace it with the current object
        acc[acc.indexOf(existingObj)] = obj;
      }
    } else {
      // If the score property is empty, add it to the new array
      acc.push(obj);
    }
    return acc;
  }, []);
  return uniqueData;
};

export const scrapeAllGames = async () => {
  try {
    const games = await fetchGamesAndDates();
    const scores = await fetchScores();

    const allGames = [...games.games, ...scores.games];
    const allDates = [...games.dates, ...scores.dates];

    const allGamesWithoutDuplicates = removeDuplicates(allGames);

    if (allGames && allDates) {
      const deletedResultGames = await deleteAllFromGames();
      const insertedResultGames = await createGames(allGamesWithoutDuplicates);
      const deletedResultDates = await deleteAllFromDates();
      const insertedResultDates = await createDates(allDates);

      if (!deletedResultDates.acknowledged) throw new Error("Failed to delete dates");
      if (!deletedResultGames.acknowledged) throw new Error("Failed to delete records");
      if (!insertedResultGames.acknowledged) throw new Error("Failed to insert records");
      if (!insertedResultDates.acknowledged) throw new Error("Failed to insert dates");
    }

    return true;
  } catch (err) {
    return false;
  }
};

export const scrapeFromRankingPage = async () => {
  try {
    const result = await fetchRankings();

    if (result) {
      const deletedResult = await deleteAllFromRankings();
      const insertedResult = await createRankings(result);

      if (!deletedResult.acknowledged) throw new Error("Failed to delete records");
      if (!insertedResult.acknowledged) throw new Error("Failed to insert records");
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const scrapeFromClubsPage = async () => {
  try {
    const result = await fetchClubs();

    if (result) {
      const deletedResult = await deleteAllFromClubs();
      const insertedResult = await createClubs(result);

      if (!deletedResult.acknowledged) throw new Error("Failed to delete records");
      if (!insertedResult.acknowledged) throw new Error("Failed to insert records");
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const loadInitialData = async () => {
  await scrapeFromClubsPage();
  await scrapeAllGames();
  await scrapeFromRankingPage();
};

export const refreshData = async () => {
  await scrapeAllGames();
  await scrapeFromRankingPage();
};
