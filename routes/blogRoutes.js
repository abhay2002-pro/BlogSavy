import express from "express";
import { createBlog, deleteBlog, getBlogById, getBlogsOfASingleUser, updateBlog } from "../controllers/blogController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/blog-posts").get(isAuthenticated, getBlogsOfASingleUser);
router.route("/blog-posts").post(isAuthenticated, createBlog);
router.route("/blog-posts/:id").get(isAuthenticated, getBlogById);
router.route("/blog-posts/:id").put(isAuthenticated, updateBlog);
router.route("/blog-posts/:id").delete(isAuthenticated, deleteBlog);

export default router;
