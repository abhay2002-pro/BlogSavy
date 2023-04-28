import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";

config({
  path: "./config/config.env",
});
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

export default app;

app.use(ErrorMiddleware);
