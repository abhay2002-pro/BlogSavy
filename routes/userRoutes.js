import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { login } from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(login);

export default router;
