import * as dotenv from "dotenv";
dotenv.config();

import Express from "express";
import http from "http";
import cors from "cors";

import clubsRoute from "./src/routes/clubs.js";
import colorsRoute from "./src/routes/colors.js";
import datesRoute from "./src/routes/dates.js";
import gamesRoute from "./src/routes/games.js";
import rankingsRoute from "./src/routes/rankings.js";
import refreshRoute from "./src/routes/refresh.js";
import statisticsRoute from "./src/routes/statistics.js";

import errorHandler from "./src/errors/ErrorHandler.js";
import ApiError from "./src/errors/ApiError.js";
import dbo from "./src/database/config.js";
import cron from "node-cron";
import { refreshData } from "./src/jobs/index.js";

const app = Express();
const server = http.createServer(app);
const port = process.env.PORT || 5050;

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the API!!!");
});

app.use("/api/clubs/", clubsRoute);
app.use("/api/colors/", colorsRoute);
app.use("/api/dates/", datesRoute);
app.use("/api/games/", gamesRoute);
app.use("/api/rankings/", rankingsRoute);
app.use("/api/refresh/", refreshRoute);
app.use("/api/statistics", statisticsRoute);

app.use((req, res, next) => {
  next(ApiError.notFound("Route not found"));
});

app.use(errorHandler);

dbo.connectToServer(() => {
  server.listen(port, () => console.log(`Server is running on port ${port}`));
  refreshData();
  const createdTime = new Date();
  console.log(`Created on ${createdTime.toLocaleTimeString()}`);
  cron.schedule("0 17,18,19,23 * * SAT", () => {
    const updatedTime = new Date();
    refreshData();
    console.log(`Updated on ${updatedTime.toLocaleTimeString()}`);
  });
});
