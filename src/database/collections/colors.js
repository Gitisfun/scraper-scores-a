import { findAll, insertMany, deleteAll } from "../queries.js";
import { COLORS_COLLECTION } from "../../logic/constants/collections.js";

export const createColors = async (list) => {
  return await insertMany(COLORS_COLLECTION, list);
};

export const getAllColors = async () => {
  return await findAll(COLORS_COLLECTION);
};

export const deleteAllFromColors = async () => {
  return await deleteAll(COLORS_COLLECTION);
};
