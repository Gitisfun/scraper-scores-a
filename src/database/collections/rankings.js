import { findAll, insertMany, deleteAll, findOne } from "../queries.js";
import { RANKINGS_COLLECTION } from "../../logic/constants/collections.js";

export const createRankings = async (list) => {
  return await insertMany(RANKINGS_COLLECTION, list);
};

export const getRanking = async (search) => {
  return await findOne(RANKINGS_COLLECTION, search);
};

export const getAllRankings = async () => {
  return await findAll(RANKINGS_COLLECTION);
};

export const deleteAllFromRankings = async () => {
  return await deleteAll(RANKINGS_COLLECTION);
};
