import { findOne, update } from "../queries.js";
import { STATISTICS_COLLECTION } from "../../logic/constants/collections.js";

const KEY_VISITED = "visited";

export const getVisited = async (search) => {
  return await findOne(STATISTICS_COLLECTION, search);
};

export const incrementVisited = async (id, value) => {
  return await update(STATISTICS_COLLECTION, id, KEY_VISITED, value);
};
