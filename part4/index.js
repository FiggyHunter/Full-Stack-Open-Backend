import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import { DATABASE_URL, PORT } from "./utils/config.js";
import userRoutes from "./routes/user.routes.js";
import bodyParser from "body-parser";
import middleware from "./utils/middleware.js";

const app = express();

console.log(DATABASE_URL);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected successfully to the Database");
  })
  .catch((e) => console.warn("Could not connect to DB!", e));

app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
