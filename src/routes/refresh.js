import express from "express";
import { refreshData } from "../jobs/index.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await refreshData();
    res.send("Refreshed data");
  } catch (err) {
    next(err);
  }
});

export default router;
