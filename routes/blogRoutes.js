import express from "express";
import { createBlog } from "../controllers/blogController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createBlog);

export default router;
