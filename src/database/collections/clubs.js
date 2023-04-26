import { findAll, findOne, insertMany, deleteAll } from "../queries.js";
import { CLUBS_COLLECTION } from "../../logic/constants/collections.js";

export const createClubs = async (list) => {
  return await insertMany(CLUBS_COLLECTION, list);
};

export const getClub = async (search) => {
  return await findOne(CLUBS_COLLECTION, search);
};

export const getAllClubs = async () => {
  return await findAll(CLUBS_COLLECTION);
};

export const deleteAllFromClubs = async () => {
  return await deleteAll(CLUBS_COLLECTION);
};
