import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import morgan from 'morgan';
import cors from "cors";

config({
  path: "./config/config.env",
});
const app = express();
app.use(morgan("dev"))
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import user from "./routes/userRoutes.js";
import blog from "./routes/blogRoutes.js";

app.use("/api/v1", user);
app.use("/api/v1", blog);

export default app;

app.use(ErrorMiddleware);
