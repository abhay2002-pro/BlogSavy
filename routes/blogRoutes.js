import express from "express";
import { allBlogs, createBlog, deleteBlog, getBlogById, getBlogsOfASingleUser, updateBlog } from "../controllers/blogController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/all-blogs").get(allBlogs);
router.route("/blog-posts").get(isAuthenticated, getBlogsOfASingleUser);
router.route("/blog-posts").post(isAuthenticated, createBlog);
router.route("/blog-posts/:id").get(getBlogById);
router.route("/blog-posts/:id").put(updateBlog);
router.route("/blog-posts/:id").delete(deleteBlog);

export default router;
