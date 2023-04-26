import { findAll, insertMany, deleteAll } from "../queries.js";
import { DATES_COLLECTION } from "../../logic/constants/collections.js";

export const createDates = async (list) => {
  return await insertMany(DATES_COLLECTION, list);
};

export const getAllDates = async () => {
  return await findAll(DATES_COLLECTION);
};

export const deleteAllFromDates = async () => {
  return await deleteAll(DATES_COLLECTION);
};
